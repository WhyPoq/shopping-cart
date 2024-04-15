import IProduct from "../interfaces/IProduct";
import useProducts from "../hooks/useProducts";
import ProductComp from "../components/ProductComp";

const Store = () => {
	const products = useProducts();

	return (
		<div className="pt-4">
			<div className="grid p-4 gap-10 products-list sm:grid-cols-2 lg:grid-cols-4">
				{products.map((product: IProduct) => {
					return <ProductComp key={product.id} product={product} />;
				})}
			</div>
		</div>
	);
};

export default Store;
