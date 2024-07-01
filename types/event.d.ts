import type { Bookmark } from "./bookmark";
import type { Image } from "./images";
import type { Location } from "./locations";
import type { Reservation } from "./reservation";
import type { Tag } from "./tags";
import type { Ticket } from "./tickets";

export type Event = {
  id: number;
  user_id: number;
  category: {
    id: number;
    name: string;
  };
  title: string;
  description: string;
  thumbnail: string;
  location: Location;
  start_date: Date;
  end_date: Date;
  images: Image[];
  tags: string[];
  tickets: Ticket[];
};

export type EventResponse = {
  id: number;
  user_id: number;
  category: {
    id: number;
    name: string;
  };
  title: string;
  description: string;
  thumbnail: string;
  location: Location;
  start_date: string;
  end_date: string;
  bookmarks?: Bookmark[];
  images?: Image[];
  reservations?: Reservation[];
  tags: Tag[];
  tickets: Ticket[];
}

export type Events = {
  events: EventResponse[];
  events_aggregate: {
    aggregate: {
      count: number;
    }
  }
}