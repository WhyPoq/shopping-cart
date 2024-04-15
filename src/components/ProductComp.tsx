import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";

import IProduct from "../interfaces/IProduct";
import formatCurrency from "../utilities/formatCurrenct";
import { useShoppingCart } from "../context/ShoppingCartContext";

interface ProductCompProps {
	product: IProduct;
}

const ProductComp = ({ product }: ProductCompProps) => {
	const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem } =
		useShoppingCart();
	const quantity = getItemQuantity(product.id);

	return (
		<div className="p-4 flex flex-col shadow justify-between">
			<div className="flex flex-col flex-grow">
				<h2 className="font-semibold two-line-ellipsis">{product.title}</h2>
				<p className="text-blue-600 font-semibold">{formatCurrency(product.price)}</p>
				<div className="flex justify-center flex-grow">
					<img className="my-2 max-w-44 max-h-44 self-center" src={product.image} />
				</div>
			</div>
			<div className="w-full mt-2 min-h-28 flex flex-col-reverse">
				{quantity === 0 ? (
					<button
						className="bg-blue-600 hover:bg-blue-700 text-white w-full p-1 rounded transition-colors"
						onClick={() => increaseItemQuantity(product.id)}
					>
						+ Add to cart
					</button>
				) : (
					<div className="flex flex-col items-center">
						<div className="flex justify-center items-center">
							<button className="bg-blue-600 hover:bg-blue-700 rounded transition-colors size-8">
								<img
									className="w-full h-full"
									src={minus}
									alt="remove 1"
									onClick={() => decreaseItemQuantity(product.id)}
								/>
							</button>
							<p className="p-3 text-lg">
								<span className="font-bold">{quantity}</span> in cart
							</p>
							<button className="bg-blue-600 hover:bg-blue-700 rounded transition-colors size-8">
								<img
									className="w-full h-full"
									src={plus}
									alt="add 1"
									onClick={() => increaseItemQuantity(product.id)}
								/>
							</button>
						</div>
						<button
							className="bg-slate-700 hover:bg-slate-600 text-white w-fit mt-2 p-1 px-3 rounded transition-colors"
							onClick={() => removeItem(product.id)}
						>
							Remove
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductComp;
