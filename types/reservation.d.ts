import type { Bookmark, BookmarkedEvents } from "./bookmark"

export type Reservation = {
  id?: number;
  user_id?: number;
  event_id?: number;
  ticket_id?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

export type ReservedEvents = BookmarkedEvents;

export type Reservations = {
    reservations: ReservedEvents[];
    reservations_aggregate: {
      aggregate: {
        count: number;
      }
    }
};

type ReserveEvent = {
  id: number;
  checkoutUrl: string;
}

export type ReserveEventResponse = {
  ReserveEvent: ReserveEvent;
}