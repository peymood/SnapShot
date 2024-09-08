import { Product } from "./Product";


export interface ItemsContextType {
    cart: {[key: number] : number};
    loading : number | null;
    data: { products: Product[]; } | undefined ; 
    handleAddToCart: (id: number) => void;
    handleIncrement: (id: number) => void;
    handleDecrement: (id: number) => void;
    handleAllDelete: () => void;
  }