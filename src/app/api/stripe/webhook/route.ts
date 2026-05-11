import { NextRequest, NextResponse } from 'next/server'

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  if (!STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 })
  }

  try {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')

    if (!sig) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

    const event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        console.log('Payment successful:', {
          sessionId: session.id,
          planId: session.metadata?.plan_id,
          treesCount: session.metadata?.trees_count,
          customerEmail: session.customer_details?.email,
          amountTotal: session.amount_total,
        })

        // TODO: When Supabase is configured:
        // 1. Create purchase record
        // 2. Auto-assign trees from available pool
        // 3. Generate ownership certificate
        // 4. Send welcome email via Resend
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 })
  }
}
