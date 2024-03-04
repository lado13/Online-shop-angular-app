export interface Product {
    id?: number;
    title: string;
    model: string;
    price: number;
    image: string;
    categoryId: number;
    category?: {
        id?: number;
        name?: string;
    };
}
