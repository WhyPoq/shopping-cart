import { useEffect, useState } from "react";
import axios from "axios";
import IProduct from "../interfaces/IProduct";

const useProducts = () => {
	const [products, setProducts] = useState<IProduct[]>([]);

	useEffect(() => {
		axios
			.get<IProduct[]>(
				"https://fakestoreapi.com/products/category/jewelery"
			)
			.then((response) => {
				setProducts(response.data);
			})
			.catch((err) =>
				console.error("Error while getting store data:", err)
			);
	}, []);

	return products;
};

export default useProducts;
