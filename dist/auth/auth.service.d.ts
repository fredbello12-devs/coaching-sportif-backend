export declare class AuthService {
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
        };
    }>;
    getProfile(): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
}
