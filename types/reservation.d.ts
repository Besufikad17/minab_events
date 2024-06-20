import type { Bookmark, BookmarkedEvents } from "./bookmark"

export type Reservation = Bookmark;

export type ReservedEvents = BookmarkedEvents;

export type Reservations = {
    reserved_events: ReservedEvents[];
    reserved_events_aggregate: {
      aggregate: {
        count: number;
      }
    }
};

