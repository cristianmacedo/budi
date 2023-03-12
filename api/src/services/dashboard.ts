import transactionsDb from "../db/transactions";

import {
  differenceInDays,
  endOfMonth,
  getMonth,
  startOfMonth,
  subDays,
} from "date-fns";
import { Filters } from "../types/filters.types";
import {
  SerializedTransaction,
  TransactionType,
} from "../types/transaction.types";

function getInsights(transactions: SerializedTransaction[]) {
  const expenses = transactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .reduce((prev, curr) => prev + curr.value, 0);
  const incomes = transactions
    .filter((t) => t.type === TransactionType.INCOME)
    .reduce((prev, curr) => prev + curr.value, 0);

  const balance = incomes - expenses;

  return {
    expenses,
    incomes,
    balance,
  };
}

async function getDashboard(userId: string, filters?: Filters) {
  const today = new Date();

  const currentPeriodStartDate = filters?.startDate || startOfMonth(today);
  const currentPeriodEndDate = filters?.endDate || endOfMonth(today);

  const transactions = await transactionsDb.findTransactionsBy("user", userId, {
    startDate: currentPeriodStartDate,
    endDate: currentPeriodEndDate,
  });

  const currentPeriodInsights = getInsights(transactions);

  // Last period

  const currentPeriodDaysDiff = differenceInDays(
    currentPeriodEndDate,
    currentPeriodStartDate
  );

  const lastPeriodStartDate = subDays(
    currentPeriodStartDate,
    currentPeriodDaysDiff
  );
  const lastPeriodEndDate = subDays(currentPeriodStartDate, 1);

  const lastPeriodTransactions = await transactionsDb.findTransactionsBy(
    "user",
    userId,
    {
      startDate: lastPeriodStartDate,
      endDate: lastPeriodEndDate,
    }
  );

  const lastPeriodInsights = getInsights(lastPeriodTransactions);

  console.log({
    currentPeriodStartDate,
    currentPeriodEndDate,
    currentPeriodDaysDiff,
  });
  console.log({ lastPeriodStartDate, lastPeriodEndDate });

  return {
    expenses: {
      current: currentPeriodInsights.expenses,
      last: lastPeriodInsights.expenses,
    },
    incomes: {
      current: currentPeriodInsights.incomes,
      last: lastPeriodInsights.incomes,
    },
    balance: {
      current: currentPeriodInsights.balance,
      last: lastPeriodInsights.balance,
    },
  };
}

const dashboardService = {
  getDashboard,
};

export default dashboardService;
