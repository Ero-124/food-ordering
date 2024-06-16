import { connectToDb } from '@/lib/utils'
import { MenuItem } from '@/models/MenuItem'
import { Order } from '@/models/Order'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
const stripe = require('stripe')(process.env.STRIPE_SK)
export async function POST(req) {
	connectToDb()

	const { cartProducts, address } = await req.json()
	console.log(address)
	const session = await getServerSession(authOptions)
	const userEmail = session?.user?.email
	const orderDoc = await Order.create({
		userEmail,
		...address,
		cartProducts,
		paid: false,
	})
	const stripeLineItems = []
	for (const cartProduct of cartProducts) {
		const productInfo = await MenuItem.findById(cartProduct._id)
		let productPrice = productInfo.basePrice
		if (cartProduct.size) {
			const size = productInfo.sizes.find(
				size => size._id.toString() === cartProduct.size._id.toString()
			)
			productPrice += size.price
		}
		if (cartProduct?.extras?.length > 0) {
			for (const cartProductExtraThing of cartProduct.extras) {
				const extraThingInfo = productInfo.extraIngridientPrices.find(
					extra => extra._id.toString() === cartProductExtraThing._id.toString()
				)
				productPrice += extraThingInfo.price
			}
		}

		stripeLineItems.push({
			price_data: {
				currency: 'usd',
				product_data: {
					name: cartProduct.name,
				},
				unit_amount: productPrice * 100,
			},
			quantity: 1,
		})
	}
	const stripeSession = await stripe.checkout.sessions.create({
		line_items: stripeLineItems,
		mode: 'payment',
		customer_email: userEmail,
		success_url:
			process.env.NEXTAUTH_URL +
			'orders/' +
			orderDoc._id.toString() +
			'?clear-cart=1',
		cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
		metadata: { orderId: orderDoc._id.toString() },
		shipping_options: [
			{
				shipping_rate_data: {
					display_name: 'Delivery fee',
					type: 'fixed_amount',
					fixed_amount: { amount: 500, currency: 'usd' },
				},
			},
		],
	})
	return Response.json(stripeSession.url)
}
