import { Schema, model, connect } from 'mongoose';

export type Variants = {
    type: string;
    value: string;
}

export type Inventory = {
    quantity: number;
    inStock: true | false
}

export type Product {
    name: string;
    description: string;
    email: string;
    price: string;
    category: string;
    tags: string;
    variants: Variants;
    inventory: Inventory;
}