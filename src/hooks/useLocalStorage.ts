import { useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T | (() => T)) => {
	const [value, setValue] = useState<T>(() => {
		const jsonValue = localStorage.getItem(key);
		try {
			if (jsonValue != null) return JSON.parse(jsonValue);
		} catch {}

		if (typeof initialValue === "function") {
			return (initialValue as () => T)();
		}
		return initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as [T, typeof setValue];
};

export default useLocalStorage;
