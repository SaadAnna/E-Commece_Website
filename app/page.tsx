import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });
  console.log(products);
  return (
    <div>
      <section>
        <div>
        <div>
        
        <h2>Welcome To Mesart</h2>
        <p>Discover the latest products at the best price.</p>
        <Button asChild variant="default">

        <Link href="/products">Browse All Products</Link>
        </Button>
        </div>
        </div>
        
      </section>
    </div>
  );
}
