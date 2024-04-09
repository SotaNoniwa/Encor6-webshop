import {
  CartProductType,
  MAX_NUM_OF_ITEMS,
} from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type CartContextType = {
  cartTotalQuantity: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQuantityIncrease: (product: CartProductType) => void;
  handleCartQuantityDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
};

// Store cartTotalQuantity, cartProducts and handleAddProductToCart in CartContext. useContext allows us to access the context from any child component, that is, we don't need to pass the data down through props. They're like global variables and local variables (not exactly but you can imagine in that way).
export const CartContext = createContext<CartContextType | null>(null);

// Accept any number of props that may have any data type.
interface Props {
  [propName: string]: any;
}

// This provider component provides the CartContext to its children.
export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  // Read items added by user, then store those items in cartProducts state.
  useEffect(() => {
    const cartItemsInLocalStorage: any = localStorage.getItem("cartItems");
    const itemsToStore: CartProductType[] | null = JSON.parse(
      cartItemsInLocalStorage
    );

    setCartProducts(itemsToStore);
  }, []);

  // Calculate total amount for items in cart
  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, quantity } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;

            acc.total += itemTotal;
            acc.quantity += item.quantity;

            return acc;
          },
          {
            total: 0,
            quantity: 0,
          }
        );

        setCartTotalQuantity(quantity);
        setCartTotalAmount(total);
      }
    };

    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      toast.success("アイテムがカートに追加されました");

      // save items that user add in cart to local storage so that it won't go away even though the page gets refresh
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });

        setCartProducts(filteredProducts);

        toast.success("アイテムがカートから取り除かれました");

        localStorage.setItem("cartItems", JSON.stringify(filteredProducts));
      }
    },
    [cartProducts]
  );

  const handleCartQuantityIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity >= MAX_NUM_OF_ITEMS) {
        return toast.error(`一度に注文できるのは${MAX_NUM_OF_ITEMS}着までです`);
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex !== -1) {
          updatedCart[existingIndex].quantity =
            updatedCart[existingIndex].quantity + 1;
        }

        setCartProducts(updatedCart);

        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleCartQuantityDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity <= 1) {
        return toast.error(
          "これ以上は減らせません\nアイテムをカートから削除する場合は「取り除く」をクリックしてください"
        );
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex !== -1) {
          cartProducts[existingIndex].quantity =
            cartProducts[existingIndex].quantity - 1;
        }

        setCartProducts(updatedCart);

        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQuantity(0);

    localStorage.clear();
  }, [cartProducts]);

  const value = {
    cartTotalQuantity,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQuantityIncrease,
    handleCartQuantityDecrease,
    handleClearCart,
  };

  // Return CartContext as the value and any other props passed to it.
  return <CartContext.Provider value={value} {...props} />;
};

// This custom hook provides access to the CartContext.
export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be within a CartContextProvider");
  }

  return context;
};
