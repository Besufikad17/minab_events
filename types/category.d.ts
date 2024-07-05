export type Category = {
    id?: number;
    name: string;
    image: string;
}

export type CategoryResponse = {
    categories: Category[];
};