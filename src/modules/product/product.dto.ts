export interface CreateProductDTO {
    name: string;
    description: string;
    price: number;
    category: string;
    stockQuantity: number;
    imageUrl?: string;
    user?: string;
}
