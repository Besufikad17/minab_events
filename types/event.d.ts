import type { Bookmark } from "./bookmark";
import type { Image } from "./images";
import type { Location } from "./location";
import type { Reservation } from "./reservation";
import type { Tag } from "./tags";

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
  enterance_fee: number;
  location: Location;
  start_date: Date;
  end_date: Date;
  images: Image[];
  tags: string[];
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
  enterance_fee: number;
  location: Location;
  start_date: string;
  end_date: string;
  bookmarks?: Bookmark[];
  images?: Image[];
  reserved_events?: Reservation[];
  tags: Tag[];
}

export type Events = {
  events: EventResponse[];
  events_aggregate: {
    aggregate: {
      count: number;
    }
  }
}