import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import contactsRouter from "./routes/contacts";
import errorMiddleware from "./middlewares/error.middleware";

dotenv.config();

const logTag = "[BUDI-API]";
const port = process.env.PORT || 3000;
const app = express();

if (!process.env.MONGO_URI) throw new Error("Missing MongoDB connection URI");

// Deprecation preparation
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    let lastConnection = res.connections[res.connections.length - 1];
    console.log(
      `${logTag} Connected to host https://${lastConnection.host} in DB "${lastConnection.name}"`
    );
  })
  .catch((err) => console.error(err));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/contacts", contactsRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`${logTag} Listening on port ${port}`);
});
