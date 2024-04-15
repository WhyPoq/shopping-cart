import closeIcon from "../assets/close.svg";
import formatCurrency from "../utilities/formatCurrenct";
import { useShoppingCart } from "../context/ShoppingCartContext";
import useProducts from "../hooks/useProducts";
import CartItem from "./CartItem";

interface ShoppingCartProps {
	isOpen: boolean;
}

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
	const { closeCart, cartItems } = useShoppingCart();
	const products = useProducts();

	const totalPrice = cartItems.reduce((sum, item) => {
		const product = products.find((product) => product.id === item.id);
		if (product) sum += item.quantity * product.price;
		return sum;
	}, 0);

	return (
		<>
			<div
				className={
					"bg-white fixed top-0 right-0 h-screen w-full sm:w-2/3 sm:max-w-96 p-5 grid shadow-2xl transition-transform duration-300 overflow-x-auto" +
					(isOpen ? "" : " translate-x-full")
				}
			>
				<div className="w-full h-full col-start-1 row-start-1 relative">
					<button onClick={closeCart} className="absolute top-0 right-0 z-20">
						<img src={closeIcon} alt="close"></img>
					</button>
				</div>
				<div className="w-full h-full col-start-1 row-start-1 z-10">
					<h2 className="text-xl font-medium mb-5">Cart</h2>
					<div className="flex flex-col gap-4">
						{cartItems.map((cartItem) => (
							<CartItem key={cartItem.id} cartItem={cartItem} products={products} />
						))}
					</div>
					{cartItems.length > 0 && (
						<p className="text-end mt-4 font-bold text-xl">
							Total: {formatCurrency(totalPrice)}
						</p>
					)}
				</div>
			</div>
		</>
	);
};

export default ShoppingCart;
