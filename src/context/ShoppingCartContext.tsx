import { createContext, useContext, ReactNode, useState } from "react";

import ShoppingCart from "../components/ShoppingCart";
import ICartItem from "../interfaces/ICartItem";
import useLocalStorage from "../hooks/useLocalStorage";

interface IShoppingCartContext {
	openCart: () => void;
	closeCart: () => void;
	getItemQuantity: (id: number) => number;
	increaseItemQuantity: (id: number) => void;
	decreaseItemQuantity: (id: number) => void;
	removeItem: (id: number) => void;
	getCartQuanity: () => number;
	cartItems: ICartItem[];
}

const ShoppingCartContext = createContext({} as IShoppingCartContext);

export const useShoppingCart = () => {
	return useContext(ShoppingCartContext);
};

interface ShoppingCartProviderProps {
	children: ReactNode;
}

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [cartItems, setCartItems] = useLocalStorage<ICartItem[]>("shopping-cart", []);

	function openCart() {
		setIsOpen(true);
	}

	function closeCart() {
		setIsOpen(false);
	}

	function getItemQuantity(id: number) {
		const foundItem = cartItems.find((curItem) => curItem.id === id);
		if (foundItem === undefined) return 0;
		return foundItem.quantity;
	}

	function increaseItemQuantity(id: number) {
		const foundItem = cartItems.find((curItem) => curItem.id === id);
		if (foundItem === undefined) {
			cartItems.push({ id: id, quantity: 1 });
		} else {
			foundItem.quantity++;
		}
		setCartItems([...cartItems]);
	}

	function decreaseItemQuantity(id: number) {
		const foundItem = cartItems.find((curItem) => curItem.id === id);
		if (foundItem === undefined) return;
		if (foundItem.quantity <= 1) setCartItems(cartItems.filter((curItem) => curItem.id !== id));
		else {
			foundItem.quantity--;
			setCartItems([...cartItems]);
		}
	}

	function removeItem(id: number) {
		setCartItems(cartItems.filter((curItem) => curItem.id !== id));
	}

	function getCartQuanity() {
		return cartItems.reduce((quantity, item) => quantity + item.quantity, 0);
	}

	return (
		<ShoppingCartContext.Provider
			value={{
				openCart,
				closeCart,
				getItemQuantity,
				increaseItemQuantity,
				decreaseItemQuantity,
				removeItem,
				getCartQuanity,
				cartItems,
			}}
		>
			{children}
			<ShoppingCart isOpen={isOpen} />
		</ShoppingCartContext.Provider>
	);
};
