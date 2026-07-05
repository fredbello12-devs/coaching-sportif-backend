export declare enum UserRole {
    USER = "user",
    COACH = "coach",
    ADMIN = "admin"
}
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
