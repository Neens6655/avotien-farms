import { NextRequest, NextResponse } from 'next/server'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

const PLAN_PRICES: Record<string, { amount: number; name: string; trees: number }> = {
  seedling: { amount: 2500, name: 'Seedling Plan — 1 Tree', trees: 1 },
  grove: { amount: 125000, name: 'Grove Plan — 50 Trees (+5 Free)', trees: 55 },
  orchard: { amount: 1250000, name: 'Orchard Plan — 500+ Trees', trees: 500 },
}

export async function POST(req: NextRequest) {
  try {
    const { planId } = await req.json()
    const plan = PLAN_PRICES[planId]

    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    if (!STRIPE_SECRET_KEY) {
      return NextResponse.json({
        error: 'Stripe is not configured. Set STRIPE_SECRET_KEY in environment variables.',
        demo: true,
      }, { status: 503 })
    }

    // Dynamic import to avoid errors when Stripe isn't configured
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(STRIPE_SECRET_KEY)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.name,
              description: `${plan.trees} Hass avocado tree${plan.trees > 1 ? 's' : ''} on Mukono Farm, Uganda`,
            },
            unit_amount: plan.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/checkout/cancel`,
      metadata: {
        plan_id: planId,
        trees_count: String(plan.trees),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
