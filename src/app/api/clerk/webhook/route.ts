import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json()
    const eventType = payload.type

    switch (eventType) {
      case 'user.created': {
        const { id, email_addresses, first_name, last_name } = payload.data
        const email = email_addresses?.[0]?.email_address
        const fullName = [first_name, last_name].filter(Boolean).join(' ') || 'Unknown'

        console.log('New user created:', { clerkId: id, email, fullName })

        // TODO: When Supabase is configured:
        // Insert into investors table: { clerk_id: id, email, full_name: fullName }
        break
      }

      case 'user.updated': {
        console.log('User updated:', payload.data.id)
        // TODO: Sync updates to investors table
        break
      }

      case 'user.deleted': {
        console.log('User deleted:', payload.data.id)
        // TODO: Soft delete or deactivate investor record
        break
      }

      default:
        console.log(`Unhandled Clerk event: ${eventType}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Clerk webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 })
  }
}
