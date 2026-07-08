export declare enum UserRole {
    USER = "USER",
    COACH = "COACH",
    ADMIN = "ADMIN"
}
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
