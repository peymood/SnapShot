import  React, { createContext, useContext, useState} from "react";
import { ItemsContextType } from "../Interfaces/ItemsContextType";
import Basket from "../Components/Basket";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../Interfaces/Product";
import { useLocalStorage } from "../hooks/useLocalStorage";




const ItemsContext = createContext<ItemsContextType>({
  cart: [],
  handleAddToCart: () => {},
  handleIncrement: () => {},
  handleDecrement: () => {},
  handleAllDelete: () => {},
});


export const useItemsContext = () => {
  return useContext(ItemsContext)
}


const fetchApi = async (): Promise<{ products: Product[] }> => {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
};

export const ItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [cart, setCart] = useLocalStorage<{ [id: number]: number }>("shopping-cart", {});
  const [loading, setLoading] = useState<number | null>(null);
  const { data } = useQuery({ queryKey: ["products"], queryFn: fetchApi });

   //افزودن به سبد خرید
   const handleAddToCart = (id: number) => {
    setLoading(id) ; 

    setTimeout(() => {
      setCart((prevCart) => ({
        ...prevCart,
        [id]: (prevCart[id] || 0) + 1,
      }));
      setLoading(null); 
    }, 500);

   
  };

  //دکمه مثبت برای اضافه کردن 
  const handleIncrement = (id: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: prevCart[id] + 1,
    }));
  };

  //دکمه منفی برای کم کردن
  const handleDecrement = (id: number) => {
    setCart((prevCart) => {
      if (prevCart[id] === 1) {
        const { [id]: _, ...rest } = prevCart; 
        return rest;
      } else {
        return {
          ...prevCart,
          [id]: prevCart[id] - 1,
        };
      }
    });
  };
  //prevcart برای اینه که در بروزرسانی خطایی ایجاد نشه 



  //حذف همه محصولات
  const handleAllDelete = () => {
    setCart({}) ;
  };


  return( 
      <ItemsContext.Provider 
          value={{
            cart, 
            loading,
            data,
            handleAddToCart, 
            handleDecrement,
            handleIncrement, 
            handleAllDelete
          }}
         >
            {data && <Basket products={data.products} />}
            {children}
            
      </ItemsContext.Provider>

)}



