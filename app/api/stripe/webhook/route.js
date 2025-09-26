// import Stripe from 'stripe';
// import { buffer } from 'micro';
// import dbConnect from '@/config/db';
// import BookOrder from '@/modals/BookOrder.modal';

// export const config = {
//   api: {
//     bodyParser: false, // Stripe requires raw body
//   },
// };

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
//   await dbConnect();

//   const buf = await buffer(req);
//   const sig = req.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     console.error('Webhook signature verification failed:', err.message);
//     return new Response(`Webhook Error: ${err.message}`, { status: 400 });
//   }

//   // Handle successful payment
//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;
//     const orderId = session.metadata.orderId;

//     // Update BookOrder in DB
//     await BookOrder.findByIdAndUpdate(orderId, {
//       paymentStatus: 'paid',
//       status: 'confirmed',
//     });
//   }

//   return new Response(JSON.stringify({ received: true }), { status: 200 });
// }
import Stripe from 'stripe';
import dbConnect from '@/config/db';
import BookOrder from '@/modals/BookOrder.modal';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();
   console.log(`req came for success`);
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
      console.log(event);
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata.orderId; // get order from session metadata

    await dbConnect();
    await BookOrder.findByIdAndUpdate(orderId, {
      paymentStatus: 'paid',
      status: 'confirmed',
    });
  }

  return new Response('Webhook received', { status: 200 });
}
