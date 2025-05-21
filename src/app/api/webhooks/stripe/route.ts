import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = (await headers()).get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return new NextResponse('Webhook signature verification failed', { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    switch (event.type) {
      case 'checkout.session.completed':
        // Handle successful checkout
        if (session.metadata?.userId) {
          await prisma.profile.update({
            where: { userId: session.metadata.userId },
            data: {
              // Update user's subscription status
              settings: {
                update: {
                  preferences: {
                    subscriptionStatus: 'active',
                    subscriptionId: session.subscription as string,
                  },
                },
              },
            },
          });
        }
        break;

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription;
        // Handle subscription updates or cancellations
        if (subscription.metadata?.userId) {
          await prisma.profile.update({
            where: { userId: subscription.metadata.userId },
            data: {
              settings: {
                update: {
                  preferences: {
                    subscriptionStatus: subscription.status,
                    subscriptionId: subscription.id,
                  },
                },
              },
            },
          });
        }
        break;

      case 'invoice.payment_succeeded':
        // Handle successful invoice payment
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          // Update payment status in your database
          await prisma.payment.create({
            data: {
              amount: invoice.amount_paid / 100, // Convert from cents to dollars
              currency: invoice.currency,
              status: 'succeeded',
              method: invoice.payment_intent ? 'card' : 'other',
              profile: {
                connect: {
                  userId: invoice.metadata?.userId,
                },
              },
              invoice: {
                connect: {
                  id: invoice.id,
                },
              },
            },
          });
        }
        break;

      case 'invoice.payment_failed':
        // Handle failed invoice payment
        const failedInvoice = event.data.object as Stripe.Invoice;
        if (failedInvoice.subscription) {
          // Update payment status in your database
          await prisma.payment.create({
            data: {
              amount: failedInvoice.amount_due / 100,
              currency: failedInvoice.currency,
              status: 'failed',
              method: 'card',
              profile: {
                connect: {
                  userId: failedInvoice.metadata?.userId,
                },
              },
              invoice: {
                connect: {
                  id: failedInvoice.id,
                },
              },
            },
          });
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new NextResponse('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Webhook processing failed', { status: 500 });
  }
} 