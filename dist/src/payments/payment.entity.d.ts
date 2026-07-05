export declare enum PaymentStatus {
    PENDING = "pending",
    PAID = "paid",
    FAILED = "failed"
}
export declare class Payment {
    id: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    userEmail: string;
}
