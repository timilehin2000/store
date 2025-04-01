export interface AuthUser {
    id: string;
    email: string;
    role: string;
}

export enum UserRoleEnum {
    USER = "user",
    ADMIN = "admin",
}
