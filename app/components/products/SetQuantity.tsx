'use client'

import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetQuantityProps {
    cartCounter?: boolean,
    cartProduct: CartProductType,
    handleQuantityIncrease: () => void,
    handleQuantityDecrease: () => void,
};

const buttonStyles = 'border-[1.2px] border-slate-300 px-2 rounded';

const SetQuantity: React.FC<SetQuantityProps> = ({
    cartCounter,
    cartProduct,
    handleQuantityIncrease,
    handleQuantityDecrease
}) => {
    return <div className="flex gap-8 items-center">
        {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}
        <div className="flex gap-4 items-center text-base">
            <button onClick={handleQuantityDecrease} className="buttonStyles">-</button>
            <div>{cartProduct.quantity}</div>
            <button onClick={handleQuantityIncrease} className="buttonStyles">+</button>
        </div>
    </div>;
}
 
export default SetQuantity;