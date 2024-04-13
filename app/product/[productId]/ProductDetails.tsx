"use client";

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  selectedImage: SelectedImageType;
  quantity: number;
  price: number;
};

export type SelectedImageType = {
  color: string;
  colorCode: string;
  imageUrl: string;
};

const Horizontal = () => {
  return <hr className="w-full my-2" />;
};

export const MAX_NUM_OF_ITEMS = 2;

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);

  // initialize cartProduct, this is the default value
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    selectedImage: product.image,
    quantity: 1,
    price: product.price,
  });

  const router = useRouter();

  console.log("cartProducts: ", cartProducts);

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex !== -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  const handleQuantityIncrease = useCallback(() => {
    if (cartProduct.quantity >= MAX_NUM_OF_ITEMS) {
      return;
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity <= 1) {
      return;
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage cartProduct={cartProduct} product={product} />
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        {product.inStock ? null : (
          <div className="text-lg font-semibold text-rose-500">
            在庫なし
            <Horizontal />
          </div>
        )}
        <div>
          <span className="font-semibold">カテゴリー:</span> {product.category}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span>カートにアイテムが追加されました</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="カートを見る"
                outline
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <span className="font-semibold">カラー: </span>
              {cartProduct.selectedImage.color}
            </div>
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQuantityIncrease={handleQuantityIncrease}
              handleQuantityDecrease={handleQuantityDecrease}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                label="カートに追加する"
                onClick={() => handleAddProductToCart(cartProduct)}
                disabled={!product.inStock}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
