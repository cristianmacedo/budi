import { RequestHandler } from "express";
import dashboardService from "../../services/dashboard";
import { Filters } from "../../types/filters.types";

const getDashboard: RequestHandler<any, any, any, Filters> = async (
  req,
  res,
  next
) => {
  const userId = req.user.id;

  const { startDate, endDate } = req.query;

  const dashboard = await dashboardService.getDashboard(userId, {
    startDate,
    endDate,
  });

  res.status(200).send(dashboard);
  next();
};

const dashboardController = {
  getDashboard,
};

export default dashboardController;
