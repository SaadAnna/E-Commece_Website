import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import Image from "next/image";
import { Carousel } from "@/components/carousel";
export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });
  return (
    <div>
      <section>
        <div>
          <div>
            <h2>Welcome To Mesart</h2>
            <p>Discover the latest products at the best Products.</p>
            <Button asChild variant="default">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
          <Image alt="Banner Image" width={450} height={450} src={products.data[0].images[0]} />
        </div>
      </section>
      <section>
        <Carousel />
      </section>
    </div>
  );
}
