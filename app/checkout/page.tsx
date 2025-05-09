"use client";

import { useState, useEffect } from "react";
import { useCardStore } from "@/store/card-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { checkoutAction } from "./checkout-action";

export default function CheckOutPage() {
  // Add client-side rendering safety
  const [isClient, setIsClient] = useState(false);
  const { items, removerItem, addItem, clearCart } = useCardStore();
  const [error] = useState<string | null>(null);

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate total only on client-side to prevent hydration mismatch
  const total = isClient 
    ? items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        <Card className="max-w-md mx-auto mb-8 p-4">
          <CardContent>
            <div className="text-center">Loading your cart...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show empty cart message
  if (total === 0 || items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart Is Empty</h1>
        <p className="mb-4">Add some items to your cart to proceed with checkout.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      {error && (
        <div className="max-w-md mx-auto mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <Card className="max-w-md mx-auto mb-8 p-4">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removerItem(item.id)}
                  >
                    –
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    variant="outline"
                    className="bg-black text-white text-lg text-center hover:bg-black cursor-pointer hover:text-white"
                    size="sm"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-lg font-semibold">
            Total: ${(total / 100).toFixed(2)}
          </div>
        </CardContent>
        
        {/* Use form action with the correct field name */}
        <form action={checkoutAction} className="px-6 pb-6">
          {/* IMPORTANT: Changed from "item" to "items" */}
          <input type="hidden" name="items" value={JSON.stringify(items)} />
          <Button type="submit" variant="default" className="w-full cursor-pointer">
            Proceed to payment
          </Button>
        </form>
        
        <div className="px-6 pb-6">
          <Button 
            onClick={() => clearCart()} 
            variant="default" 
            className="w-full cursor-pointer"
          >
            Clear Cart
          </Button>
        </div>
      </Card>
    </div>
  );
}