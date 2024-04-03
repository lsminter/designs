import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import initStripe from "stripe";

const handler = async (req, res) => {
  const supabase = createServerSupabaseClient({ req, res });

  const {
    data: {user} 
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  const { data: { stripe_customer} } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id", user.id)
    .single();

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const { priceId } = req.query;
  const lineItems = [{
    price: priceId,
    quantity: 1,
  }]

  const session = await stripe.checkout.sessions.create({
    customer: stripe_customer,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: `${process.env.CLIENT_URL}/payment/success`,
    cancel_url: `${process.env.CLIENT_URL}/payment/cancelled`,
  });

  res.send({
    id: session.id
  });
};

export default handler;