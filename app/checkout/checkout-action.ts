"use server";

import { stripe } from "@/lib/stripe";
import { CardItem } from "@/store/card-store";
import { redirect } from "next/navigation";

export async function checkoutAction(formData: FormData): Promise<void> {
  // Get the items JSON string from the form data
  const itemsJson = formData.get("items") as string;
  
  if (!itemsJson) {
    console.error("No items found in form data");
    throw new Error("No items provided for checkout");
  }
  
  try {
    // Parse the JSON string into an array of items
    const items = JSON.parse(itemsJson);
    
    if (!Array.isArray(items) || items.length === 0) {
      console.error("Invalid items array:", items);
      throw new Error("Invalid or empty items array");
    }
    
    // Map the items to Stripe line items
    const line_items = items.map((item: CardItem) => ({
      price_data: {
        currency: "cad",
        product_data: { name: item.name },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));
    
    // Check for environment variables and log them for debugging
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    console.log("Base URL from environment:", baseUrl);
    
    // Check for the misspelled variable as fallback
    const misspelledBaseUrl = process.env.NEXT_PUPLIC_BASE_URL;
    if (misspelledBaseUrl && !baseUrl) {
      console.warn("Found misspelled NEXT_PUPLIC_BASE_URL instead of NEXT_PUBLIC_BASE_URL");
    }
    
    // Use a fallback if neither is available
    const finalBaseUrl = baseUrl || misspelledBaseUrl || "http://localhost:3000";
    
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
      line_items,
      mode: "payment",
      success_url: `${finalBaseUrl}/success`,
      cancel_url: `${finalBaseUrl}/checkout`,
    });
    
    if (!session.url) {
      throw new Error("Failed to create checkout session");
    }
    
    // Redirect to the Stripe checkout page
    redirect(session.url);
    
  } catch (error) {
    console.error("Checkout action error:", error);
    
    if (error instanceof SyntaxError) {
      throw new Error("Invalid cart data format");
    }
    
    throw error;
  }
}