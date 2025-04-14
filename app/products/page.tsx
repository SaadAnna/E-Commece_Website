import { ProductsList } from "@/components/products-list";
import { stripe } from "@/lib/stripe";

export default async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });
  return (
    <div className="pb-8">
      <h1 className="lg:text-5xl text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">All Products</h1>

      <ProductsList products={products.data} />
    </div>
  );
}
