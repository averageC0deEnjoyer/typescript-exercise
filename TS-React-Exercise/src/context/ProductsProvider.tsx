import { createContext } from 'react';

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

const initState: ProductType[] = [
  { sku: 'de item', name: 'watever', price: 9.99 },
  { sku: 'de item 2', name: 'watever 2', price: 19.99 },
  { sku: 'de item 3', name: 'watever 3', price: 29.99 },
];

export type UseProductsContextType = { products: ProductType[] };

const initContextState: UseProductsContextType = { products: [] };

const ProductsContext = createContext<UseProductsContextType>(initContextState);
