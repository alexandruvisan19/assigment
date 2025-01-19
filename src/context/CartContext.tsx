import React, { createContext, useContext, useState } from "react";
import { CartContextProps, CartItem } from "./types";

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [cart, setCart] = useState<CartItem[]>([]);

	const addToCart = (book: CartItem): { success: boolean; message?: string } => {
		const existingItem = cart.find((item) => item.id === book.id);

		if (existingItem) {
			if (existingItem.quantity >= book.stock) {
				return { success: false, message: `No more stock available for "${book.title}".` };
			}
			setCart((prevCart) =>
				prevCart.map((item) => (item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item))
			);
			return { success: true };
		}

		if (book.stock <= 0) {
			return { success: false, message: `"${book.title}" is out of stock.` };
		}

		setCart((prevCart) => [...prevCart, book]);
		return { success: true };
	};

	const removeFromCart = (id: number) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== id));
	};

	const updateCartQuantity = (id: number, newQuantity: number): string | null => {
		const updatedCart = cart.map((item) => {
			if (item.id === id) {
				if (newQuantity > item.stock) {
					return item;
				}
				return { ...item, quantity: newQuantity };
			}
			return item;
		});

		const item = cart.find((item) => item.id === id);
		if (item && newQuantity > item.stock) {
			return `No more stock available for "${item.title}". Total available stock: ${item.stock}`;
		}

		setCart(updatedCart);
		return null;
	};

	const submitCart = () => {
		setCart([]);
		alert("Order submitted successfully!");
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				updateCartQuantity,
				submitCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = (): CartContextProps => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
