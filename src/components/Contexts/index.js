import { createContext, useEffect, useState } from "react";
import { getSessionItem, setSessionItem, clearSessionItem } from "../../ultis";
export const Context = createContext({});

export function ContextProvider({ children }) {
    const [cartProducts, setCartProducts] = useState(getSessionItem('cart') || []);
    const [accounts, setAccounts] = useState({});
    useEffect(() => {
        if (cartProducts?.length > 0) {
            setSessionItem('cart', cartProducts);
        }
        else (
            clearSessionItem('cart')
        )
    }, [cartProducts])
    const addProduct = (product) => {
        setCartProducts(prev => [...prev, product]);
    }
    const removeProduct = (product) => {
        setCartProducts(prev => {
            const pos = prev.findIndex(proc => proc._id === product._id);
            if (pos !== -1) {
                return prev.filter((proc, index) => index !== pos);
            }
            return prev;
        })
    }
    return (
        <Context.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, accounts, setAccounts }}>
            {children}
        </Context.Provider>
    );
}