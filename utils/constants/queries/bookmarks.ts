export const BookmarkMutation = gql`
    mutation Bookmark(
        $event_id: Int!,
        $user_id: Int!
    ) {
        insert_bookmarks_one(
            object: {
                event_id: $event_id,
                user_id: $user_id
            }
        ) {
            id
            user_id
            event_id
        }
    }
`;

export const UnBookmarkMutation = gql`
    mutation UnBookmark(
        $event_id: Int!,
        $user_id: Int!
    ) {
        delete_bookmarks(
            where: {
                event_id: {
                    _eq: $event_id,
                },
                user_id: {
                    _eq: $user_id
                }
            }
        ) {
            returning {
                id
            }
        }
    }
`;

export const GetBookmarksQuery = gql`
    query GetBookmarks(
        $user_id: Int!,
        $skip: Int = 0,
        $take: Int = 6,
    ) {       
        bookmarks_aggregate {
            aggregate {
                count
            }
        }
        bookmarks(
            where: {
            user_id: {
                _eq: $user_id
            }
            },
            offset: $skip,
            limit: $take
        ) {
            event {
                id
                title
                category {
                    name
                }
                location {
                    city
                    venue
                }
                thumbnail
                start_date
                end_date
            }  
        }
    }
`;