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
    reserved_events: ReservedEvents[];
    reserved_events_aggregate: {
      aggregate: {
        count: number;
      }
    }
};

