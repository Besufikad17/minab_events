import type { EventResponse } from './event';

export type Bookmark = {
    id?: number;
    user_id?: number;
    event_id?: number;
    created_at?: string;
    updated_at?: string;
}

export type BookmarkedEvents = {
    event: EventResponse;
}

export type Bookmarks = {
    bookmarks: BookmarkedEvents[];
    bookmarks_aggregate: {
      aggregate: {
        count: number;
      }
    }
}