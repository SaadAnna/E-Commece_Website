"use client";
import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
interface Props {
  product: Stripe.Product;
}
export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
 
  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className=" group hover:shadow-2xl transition duration-300 py-0 h-full  flex flex-col border border-solid border-black rounded-xl">
        {product.images && product.images[0] && (
          <div className="relative w-full h-96">
            <Image
              alt={product.name}
              src={product.images[0]}
              layout="fill"
              objectFit="contain"
              className="group-hover:opacity-90 transition-opacity duration-500 ease-in-out rounded-t-lg"
            />
          </div>
        )}

        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold text-black">
            {product.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-2 flex flex-grow flex-col justify-between">
          {product.description &&  (
                        <p className="text-gray-600 text-lg mb-2">{product.description}</p>

          )}
          {price && price.unit_amount && (
            <p className="text-xl">${(price.unit_amount / 100).toFixed(2)}</p>
          )}
          <Button className="mt-4 bg-black  text-white justify-center">View More Details</Button>
        </CardContent>
      </Card>
    </Link>
  );
};
