import { UserRoleEnum } from "../../interfaces";

export interface RegisterUserDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRoleEnum;
}

export interface LoginDTO {
    email: string;
    password: string;
}
