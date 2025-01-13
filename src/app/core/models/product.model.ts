export interface Product {
    name: string;
    description: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    categories: string[];
    images: string[];
}

export interface ProductResponse {
    "@context": string;
    "@id": string;
    "@type": string;
    totalItems: number;
    member: Product[];
    view?: {
        "@id": string;
        "@type": string;
        first: string;
        last: string;
        next?: string;
    };
}
