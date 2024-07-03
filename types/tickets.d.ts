export type Ticket = {
    id?: number;
    event_id: number;
    ticket_type: string;
    price: number;
    description: string;
    created_at?: Date;
    updated_at?: Date;
}

export type TicketResponse = {
    tickets: Ticket[];
}