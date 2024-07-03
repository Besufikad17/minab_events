export type Payment = {
    id?: number;
    user_id?: number;
    ticket_id?: number;
    amount?: number;
    reference?: string;
    status?: string;
    created_at?: Date;
    updated_at?: Date;
}

export type PaymentResponse = {
    payments: Payment[];
}