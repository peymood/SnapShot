import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

   useEffect( () => {
    try {
      setStoredValue(storedValue);
      localStorage.setItem(key, JSON.stringify(storedValue));
      localStorage.clear() ; 
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  });

  return [storedValue, setStoredValue] as const ; 
}
  
 
