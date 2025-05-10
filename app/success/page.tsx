"use client";
import { Button } from "@/components/ui/button";
import { useCardStore } from "@/store/card-store";
import Link from "next/link";
import { useEffect } from "react";

export default function SucessPage() {
  const { clearCart } = useCardStore();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="flex justify-center mx-auto mt-14 flex-col text-center gap-3">
      <h1 className="text-bold text-3xl text-green-600">Payment Seccessufull.</h1>
      <p className="tex-lg text-gray-500 text-medium">
        Thank You For Chossing Our Store, Your Order Is Being Processed.
      </p>
      <Button className="w-max-3xl mx-auto">
        <Link href={"/products"}>Continue Shopping</Link>
      </Button>
    </div>
  );
}
