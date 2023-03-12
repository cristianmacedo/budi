import express from "express";

import dashboardController from "../controllers/dashboard/";
import authMiddleware from "../middlewares/auth.middleware";

const dashboardRouter = express.Router();

dashboardRouter.get("/", authMiddleware, dashboardController.getDashboard);

export default dashboardRouter;
