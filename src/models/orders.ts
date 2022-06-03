export type Order = {
    id?: string;
    status: string;
    user_id?: string;
}

export type OrderProduct = {
    id?: string;
    quantity: number;
    productID: number;
    orderID:number;
}