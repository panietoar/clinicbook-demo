import Stripe from 'npm:stripe@14'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!)

Deno.serve(async (req) => {
  const { appointmentId, amount } = await req.json()
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      price_data: { currency: 'usd', product_data: { name: 'Consultation' }, unit_amount: amount },
      quantity: 1
    }],
    metadata: { appointmentId },
    success_url: 'https://clinicbook.app/paid',
    cancel_url: 'https://clinicbook.app/cancel'
  })
  return new Response(JSON.stringify({ url: session.url }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  })
})
