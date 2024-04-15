import { useShoppingCart } from "../context/ShoppingCartContext";

import ICartItem from "../interfaces/ICartItem";
import IProduct from "../interfaces/IProduct";
import formatCurrency from "../utilities/formatCurrenct";

interface CartItemProps {
	cartItem: ICartItem;
	products: IProduct[];
}

const CartItem = ({ cartItem, products }: CartItemProps) => {
	const { removeItem } = useShoppingCart();

	const product = products.find((el) => el.id === cartItem.id);
	if (!product) return null;

	const totalPrice = product.price * cartItem.quantity;

	return (
		<div className="flex gap-3 items-center">
			<div className="flex w-16 flex-col justify-center items-center">
				<img className="max-w-16 max-h-16" src={product.image}></img>
			</div>
			<div className="flex justify-between flex-grow flex-col min-[420px]:flex-row">
				<div className="flex flex-col justify-center">
					<div className="flex gap-1">
						<p className="max-w-24 truncate font-medium text-md">{product.title}</p>
						<p className="text-sm text-slate-600">x{cartItem.quantity}</p>
					</div>
					<p className="text-slate-600 hidden min-[420px]:block">
						{formatCurrency(product.price)}
					</p>
				</div>
				<div className="flex items-center gap-4">
					<p className="text-xl">{formatCurrency(totalPrice)}</p>
				</div>
			</div>
			<button
				className="border-2 border-slate-700 rounded size-8 hover:bg-slate-700 transition-colors"
				onClick={() => removeItem(cartItem.id)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					viewBox="0 -960 960 960"
					width="24"
					className="w-full h-full hover:fill-white transition-colors"
				>
					<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
				</svg>
			</button>
		</div>
	);
};

export default CartItem;
