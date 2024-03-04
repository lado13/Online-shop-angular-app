
export interface Order {

    UserId?: number;
    Products: { ProductId: number }[];
    OrderDate: Date;
}

