import type { Bookmark } from "./bookmark";
import type { Tag } from "./tags";

export type Location = {
  id: number;
  city: string;
  venue: string;
  full_location: string;
}

export type Event = {
  id: number;
  user_id: number;
  category: {
    id: number;
    name: string;
  };
  title: string;
  description: string;
  image: string;
  enterance_fee: number;
  location: Location;
  start_date: Date;
  end_date: Date;
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
  image: string;
  enterance_fee: number;
  location: Location;
  start_date: string;
  end_date: string;
  tags: Tag[];
  bookmarks?: Bookmark[];
}

export type Events = {
  events: EventResponse[];
  events_aggregate: {
    aggregate: {
      count: number;
    }
  }
}