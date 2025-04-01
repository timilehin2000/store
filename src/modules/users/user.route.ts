import { Router } from "express";
import { handleAsyncError } from "../../utils";
import { UserRepo } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { validate } from "../../middleware/validate";
import { loginValidation, registerValidation } from "./user.validation";

const userRouter = Router();

const userRepo = new UserRepo();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

userRouter.post(
    "/register",
    validate(registerValidation),
    handleAsyncError(userController.registerUser.bind(userController))
);

userRouter.post(
    "/login",
    validate(loginValidation),
    handleAsyncError(userController.login.bind(userController))
);

export { userRouter };
