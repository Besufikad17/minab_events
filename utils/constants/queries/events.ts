export const getAllEventsQuery = gql`
    query GetAllEvents {
        events {
            id
            title
            user_id
            category {
                name
            }
            image
            enterance_fee
            start_date
            end_date
            location {
                city
            venue
            }
            tags {
                name
            }
        }
    }
`;

export const getEventsQuery = gql`
    query SearchEvent(
        $skip: Int = 0,
        $take: Int = 10,
    ) {
        events(
            offset: $skip,
            limit: $take,
        ) {
            id
            title
            user_id
            category {
                name
            }
            image
            enterance_fee
            start_date
            end_date
            location {
                city
                venue
            }
            tags {
                name
            }
        }
    }
`;

export const searchEventQuery = gql`
    query SearchEvent($text: String = "%%", $category_id: Int, $max_fee: float8, $start_date: date, $end_date: date, $tags: [String!], $city: String, $skip: Int!, $take: Int!) {
        events(
            where: {
                title: {
                    _ilike: $text
                },
                category_id: {
                    _eq: $category_id
                },
                enterance_fee: {
                    _lte: $max_fee
                },
                start_date: {
                    _eq: $start_date
                },
                end_date: {
                    _eq: $end_date
                },
                location: {
                    city : {
                    _eq : $city
                    }
                },
                tags: {
                    name: {
                    _in: $tags
                    }
                }
            },
            offset: $skip,
            limit: $take
        ) {
            id
            title
            description
        }
    }
`;

export const AddEvent = gql`
    mutation CreateEvent(
      $title: String!,   
      $description: String!,  
      $user_id: Int!,   
      $category_id: Int!,   
      $city: String!,
      $venue: String!,
      $image: String!,   
      $enterance_fee: float8!,   
      $start_date: date!,   
      $end_date: date!,
      $tags: [String!]!
    ) {
      CreateEvent(
        title: $title,
        description: $description,
        user_id: $user_id,
        category_id: $category_id,
        city: $city,
        venue: $venue,
        image: $image,
        enterance_fee: $enterance_fee,
        start_date: $start_date,
        end_date: $end_date,
        tags: $tags
      ) {
        id
      }
    }
`;
