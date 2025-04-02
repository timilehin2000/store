import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./modules/users";
import { errorHandler, notFoundHandler } from "./middleware";
import { categoryRouter } from "./modules/category";
import { productRouter } from "./modules/product";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/api/v1", (req: Request, res: Response) => {
    res.status(200).json({ message: "Welcome home!" });
});

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
