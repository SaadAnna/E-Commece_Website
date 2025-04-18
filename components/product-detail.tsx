"use client";
import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCardStore } from "@/store/card-store";
interface Props {
  product: Stripe.Product;
}
export const ProductDetail = ({ product }: Props) => {
  const {items, addItem, removerItem} = useCardStore()
  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = ()  => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0]: null,
      quantity: 1,
    })
  }
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      {product.images && product.images[0] && (
        <div className="relative w-full h-96 md:w-1/2 rounded-lg overflow-hidden">
          <Image
            alt={product.name}
            src={product.images[0]}
            layout="fill"
            objectFit="cover"
            className="hover:opacity-90 transition duration-300"
          />
        </div>
      )}

      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        {product.description && 
          <p className="text-neutral-500 text-lg mb-2">{product.description}</p>
        }
            {price && price.unit_amount && (
            <p className="text-xl text-black font-bold">${(price.unit_amount / 100).toFixed(2)}</p>
          )}
      <div className="flex items-center space-x-4 mt-2">
      <Button onClick={() => removerItem(product.id) } className="bg-white text-black text-lg text-center cursor-pointer" variant={"outline"}>-</Button>

       <span className="text-lg font-semibold">{quantity}</span>
       <Button onClick={onAddItem} className="bg-black text-white text-lg text-center hover:bg-black cursor-pointer hover:text-white" variant={"outline"}>+</Button>

      </div>
      </div>
    </div>
  );
};
