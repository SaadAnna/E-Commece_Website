import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
interface Props {
  product: Stripe.Product;
}
export const ProductDetail = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

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
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        {product.description && 
          <p className="text-neutral-500 text-lg mb-2">{product.description}</p>
        }
            {price && price.unit_amount && (
            <p className="text-xl text-black font-bold">${(price.unit_amount / 100).toFixed(2)}</p>
          )}
      <div className="flex items-center space-x-4 mt-2">
      <Button className="bg-white text-black text-sm" variant={"outline"}>-</Button>

       <span className="text-lg font-semibold">{0}</span>
       <Button className="bg-black text-white text-sm" variant={"outline"}>+</Button>

      </div>
      </div>
    </div>
  );
};
