import Stripe from "stripe";
import { ProductCard } from "./product-card";

interface Props {
  products: Stripe.Product[];
}
export const ProductsList = ({ products }: Props) => {
  return (
    <div>
      <div className="mb-14 flex justify-center">
        <input type="text" placeholder="Search Product..."  className="w-full max-w-md px-4 p-2 rounded-lg py-2 border-solid  border border-gray-400 focus:outline-none focus:border-black"/>
      </div>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, key) => {
          return (
            <li key={key}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

