export type Location = {
  city: string;
  venue: string;
}

export type Event = {
  id: number;
  userId: number;
  category: string;
  title: string;
  description: string;
  image: string;
  enteranceFee: number;
  location: Location;
  startDate: Date;
  endDate: Date;
  tags: string[];
};
