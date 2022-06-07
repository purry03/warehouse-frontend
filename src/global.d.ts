interface ProductState{
    product: Product;
}

interface Product{
    listing_id ?: any;
    img ?: string;
    title ?: string;
    description ?: string;
    price ?: number;
    inventory ?: number;
}

interface Listing{
    listing_id: string;
    title : string;
    description : string;
    price : number;
    quantity : number;
    inventory : number;
}

interface User{
    username : string;
    accessToken : string;
    refreshToken : string;
    type ?: string;
}

interface Prebooking{
    username : string;
    quantity : number;
    productTitle :string;
    productPrice : string;
}


interface NewPrebooking{
    prebooking_id ?: number;
    prebooking_number ?: string;
    listing_id ?: number;
    user_id ?: number;
    quantity ?: number;
}