"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currenProduct = products[current];

  const price = currenProduct.default_price as Stripe.Price;

  return (
    <Card className="relative overflow-hidden rounded-lg shadow-md border-gary-300">
      {currenProduct.images && currenProduct.images[0] && (
        <div className="relative  w-96 h-96 m-auto">
          <Image
            alt={currenProduct.name}
            src={currenProduct.images[0]}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-500 ease-in-out"
          />
        </div>
      )}

      <CardContent className="absolute inset-0 flex flex-col items-center justify-center ">
        <CardTitle className="text-5xl">{currenProduct.name}</CardTitle>
        {price && price.unit_amount && (
          <p className="text-xl">${(price.unit_amount / 100).toFixed(2)}</p>
        )}
      </CardContent>
    </Card>
  );
};
