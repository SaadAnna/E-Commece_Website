import { ProductsList } from "@/components/products-list";
import { stripe } from "@/lib/stripe";

export default async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });
  return (
    <div>
      <h1>All Products</h1>

      <ProductsList products={products.data} />
    </div>
  );
}
