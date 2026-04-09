"use client";

import { useCart } from "./CartContext";

type Props = {
  productId: string;
  name: string;
  price: number;
  className?: string;
  children: React.ReactNode;
};

export function AddToCartButton({
  productId,
  name,
  price,
  className = "btn btn-sm hwache-btn-outline hwache-add-cart",
  children,
}: Props) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      className={className}
      onClick={() => addItem(productId, name, price)}
    >
      {children}
    </button>
  );
}
