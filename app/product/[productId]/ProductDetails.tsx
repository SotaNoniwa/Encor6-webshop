'use client'

import Button from "@/app/components/products/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
    product: any;
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    selectedImage: SelectedImageType,
    quantity: number,
    price: number
}

export type SelectedImageType = {
    color: string,
    colorCode: string,
    imageUrl: string
}

const Horizontal = () => {
    return <hr className="w-full my-2" />
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const { handleAddProductToCart, cartProducts } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);

    // initialize cartProduct, this is the default value
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        selectedImage: { ...product.images[0] },
        quantity: 1,
        price: product.price,
    });

    const router = useRouter();

    console.log(cartProducts);

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

    // whenever a user change product's color (cartProduct.selectedImage), we redefine this function to ensure it takes the latest value of SelectedImage as a parameter.
    const handleColorSelect = useCallback((value: SelectedImageType) => {
        setCartProduct((prev) => {
            // Update only selectedImage's value (others remain the same).
            return { ...prev, selectedImage: value };
        });
    }, [cartProduct.selectedImage]);

    const handleQuantityIncrease = useCallback(() => {
        if (cartProduct.quantity >= 5) {
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
            return { ...prev, quantity: prev.quantity - 1 }
        });
    }, [cartProduct]);

    return <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductImage
            cartProduct={cartProduct}
            product={product}
            handleColorSelect={handleColorSelect}
        />
        <div className="flex flex-col gap-1 text-slate-500 text-sm">
            <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
            <Horizontal />
            <div className="text-justify">{product.description}</div>
            <Horizontal />
            <div>
                <span className="font-semibold">CATEGORY:</span> {product.category}
            </div>
            <div className="font-semibold text-rose-400">{product.inStock ? null : 'SOLD OUT'}</div>
            <Horizontal />
            {isProductInCart ? (
                <>
                    <p className="mb-2 text-slate-500 flex items-center gap-1">
                        <MdCheckCircle className="text-teal-400" size={20} />
                        <span>Product added to cart</span>
                    </p>
                    <div className="max-w-[300px]">
                        <Button
                            label="View Cart"
                            outline
                            onClick={() => {
                                router.push('/cart');
                            }}
                        />
                    </div>
                </>
            ) : (
                <>
                    <SetColor
                        images={product.images}
                        cartProduct={cartProduct}
                        handleColorSelect={handleColorSelect}
                    />
                    <Horizontal />
                    <SetQuantity
                        cartProduct={cartProduct}
                        handleQuantityIncrease={handleQuantityIncrease}
                        handleQuantityDecrease={handleQuantityDecrease}
                    />
                    <Horizontal />
                    <div className="max-w-[300px]">
                        <Button
                            label="Add To Cart"
                            onClick={() => handleAddProductToCart(cartProduct)}
                        />
                    </div>
                </>
            )}
        </div>
    </div>;
}

export default ProductDetails;