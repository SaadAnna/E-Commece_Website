import Stripe from "stripe";
import { ProductCard } from "./product-card";

interface Props {
  products: Stripe.Product[];
}
export const ProductsList = ({ products }: Props) => {
  return (
    <div>
      <div>
        <input type="text" placeholder="Search Product..." />
      </div>
      <ul>
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

