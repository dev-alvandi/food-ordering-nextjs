import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types-db";

import { toast } from "react-hot-toast";

interface CartStoreProps {
  items: Product[];

  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateItemQuantity: (id: string, quantity: number) => void;
}

const useCart = create(
  persist<CartStoreProps>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItems = currentItems.find((item) => item.id === data.id);

        if (existingItems) {
          return toast("Item already in the cart");
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to the cart");
      },

      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed from the cart");
      },

      removeAll: () => {
        set({ items: [] });
        toast.success("Cart empty");
      },

      updateItemQuantity: (id: string, qty: number) => {
        console.log(id, qty);
        const updatedItems = get().items.map((item) =>
          item.id === id ? { ...item, qty } : item
        );

        console.log(updatedItems);

        set({ items: updatedItems });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
