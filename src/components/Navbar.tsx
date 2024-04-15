import CustomLink from "./CustomLink";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar = () => {
	const { getCartQuanity, openCart } = useShoppingCart();

	let cartQuantity = 0;
	if (getCartQuanity) cartQuantity = getCartQuanity();

	return (
		<div
			className="sticky top-0 p-2 pr-4 sm:pr-16 text-base sm:text-xl bg-slate-700 text-white font-medium flex 
		justify-between items-center shadow-[rgba(0,0,15,0.4)_0px_0px_10px_2px]"
		>
			<nav className="md:pl-20 p-4 flex gap-4 sm:gap-6">
				<CustomLink to="/">Home</CustomLink>
				<CustomLink to="/store">Store</CustomLink>
				<CustomLink to="/about">About</CustomLink>
			</nav>
			<button
				onClick={openCart}
				className="box-content size-6 sm:size-8 border-2 border-slate-700 hover:border-blue-200 p-1 rounded transition-colors relative"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#FFFFFF">
					<path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
				</svg>
				{cartQuantity > 0 && (
					<p
						className="absolute text-sm bg-blue-600 right-0 bottom-0 translate-x-[55%] translate-y-[30%] rounded-full size-[1.4rem] leading-[1.4rem] 
				text-center truncate"
					>
						{cartQuantity}
					</p>
				)}
			</button>
		</div>
	);
};

export default Navbar;
