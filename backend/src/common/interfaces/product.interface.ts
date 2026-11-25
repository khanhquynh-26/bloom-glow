export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    stock: number;
    categoryId: number;
    imageUrl: string;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}