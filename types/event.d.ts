export type Location = {
  city: string;
  venue: string;
}

export type Event = {
  id: number;
  user_id: number;
  category: {
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
