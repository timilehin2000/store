import { Request, Response } from "express";
import { UserService } from "./user.service";
import { SuccessResponse } from "../../utils";

export class UserController {
    constructor(private userService: UserService) {}

    async registerUser(req: Request, res: Response) {
        const data = req.body;

        const result = await this.userService.registerUser(data);

        return SuccessResponse.send(
            res,
            result,
            "User registered successfully",
            201
        );
    }

    async login(req: Request, res: Response) {
        const data = req.body;

        const result = await this.userService.login(data);

        return SuccessResponse.send(res, result, "Login successfully", 200);
    }
}
