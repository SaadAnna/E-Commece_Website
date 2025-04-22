"use client";

import { useCardStore } from "@/store/card-store";
import { Button } from "./ui/button";
export default function CheckOutPage() {
  const { items, removerItem, addItem } = useCardStore();
  const total = items.reduce(
    (acc, item) => acc + item.price + item.quantity, 
    0
  );

  if (total === 0 || items.length === 0) {
    return (
<div>
  <h1>Your Cart Is Empty</h1>
</div>
    );
  }
   return (
    <div>
    <h1>
      Checkout
    </h1>
    <Card>

    <CardHeader >

    <CardTitle>
       Your Order Summary
    </CardTitle>
    </CardHeader>
    <CardContent>

    <ul>
      {items.map((item, key) => {
       <li key={key}>

       <div> 
       <span>
        {item.name}
       </span>
       <span>
       ${(( item.price * item.quantity ) / 100 )toFixed(2)}
       </span>
       <div className="flex items-center space-x-4 mt-2">
      <Button onClick={() => removerItem(item.id) } className="bg-white text-black text-lg text-center cursor-pointer" variant={"outline"}>-</Button>

       <span className="text-lg font-semibold">{item.quantity}</span>
       <Button onClick={() => addItem(item.id)} className="bg-black text-white text-lg text-center hover:bg-black cursor-pointer hover:text-white" variant={"outline"}>+</Button>

      </div>
       </div>
       </li>
      })}
    </ul>
    </CardContent>
    </Card>
    </div>
  )
}
