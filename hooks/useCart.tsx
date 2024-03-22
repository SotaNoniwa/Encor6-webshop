import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQuantity: number,
    cartProducts: CartProductType[] | null,
    handleAddProductToCart: (product: CartProductType) => void,
};

// Store cartTotalQuantity, cartProducts and handleAddProductToCart in CartContext. useContext allows us to access the context from any child component, that is, we don't need to pass the data down through props. It's like global variables and local variables (not exactly but you can imagine in that way).
export const CartContext = createContext<CartContextType | null>(null);

// Accept any number of props that may have any data type.
interface Props {
    [propName: string]: any;
}

// This provider component provides the CartContext to its children.
export const CartContextProvider = (props: Props) => {
    const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    // Read items added by user, then store those items in cartProducts variable.
    useEffect(() => {
        const cartItemsInLocalStorage: any = localStorage.getItem('cartItems');
        const itemsToStore: CartProductType[] | null = JSON.parse(cartItemsInLocalStorage);

        setCartProducts(itemsToStore)
    }, []);

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if (prev) {
                updatedCart = [...prev, product];
            } else {
                updatedCart = [product];
            }

            toast.success('Product added to cart');

            // save items that user add in cart to local storage so that it won't go away even though the page gets refresh
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));

            return updatedCart;
        });
    }, []);

    const value = {
        cartTotalQuantity,
        cartProducts,
        handleAddProductToCart,
    };

    // Return CartContext as the value and any other props passed to it.
    return <CartContext.Provider value={value} {...props} />;
}

// This custom hook provides access to the CartContext.
export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error('useCart must be within a CartContextProvider');
    }

    return context;
}