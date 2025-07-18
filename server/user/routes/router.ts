// User Router, This file shouldn't be modified generally
import express from "express";
import userRoutes from "./user";

const userRouter = express.Router();

userRouter.use("/api/user", userRoutes);

export default userRouter;

