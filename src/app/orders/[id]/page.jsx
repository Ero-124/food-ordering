'use client'

import AddressInputs from '@/components/layout/AddressInputs'
import SectionHeaders from '@/components/layout/SectionHeaders'
import CartProduct from '@/components/menu/CartProduct'
import { CartContext, cartProductPrice } from '@/context/CartContext'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import uniqid from 'uniqid'

export default function OrderPage() {
	const { clearCart } = useContext(CartContext)
	const { id } = useParams()
	const [order, setOrder] = useState()
	const [loadingOrder, setLoadingOrder] = useState(true)
	useEffect(() => {
		if (typeof window !== 'unefined') {
			if (window.location.href.includes('clear-cart=1')) {
				clearCart()
			}
		}
		if (id) {
			fetch(`/api/orders?_id=${id}`)
				.then(response => response.json())
				.then(orderData => {
					setOrder(orderData)
					setLoadingOrder(false)
				})
		}
	}, [])

	let subTotal = 0
	if (order?.cartProducts) {
		for (const product of order?.cartProducts) {
			subTotal += cartProductPrice(product)
		}
	}
	return (
		<section className='mt-8 max-w-2xl text-center mx-auto '>
			<div className='text-center'>
				<SectionHeaders mainHeader='Your order' />
				<div className='mt-4 mb-8'>
					<p>Thanks for your order</p>
					<p>We will call you when your order will be on the way</p>
				</div>
			</div>
			{loadingOrder && <div>Loading order...</div>}
			{order && (
				<div className='grid md:grid-cols-2 md:gap-16'>
					<div>
						{order.cartProducts.map(product => (
							<CartProduct key={uniqid()} product={product} />
						))}
						<div className='text-right py-2 text-gray-500'>
							Subtotal:
							<span className='text-black font-bold w-16 inline-block'>
								${subTotal}
							</span>
							<br />
							Delivery:
							<span className='text-black font-bold w-16 inline-block'>$5</span>
							<br />
							Total:
							<span className='text-black font-bold w-16 inline-block'>
								${subTotal + 5}
							</span>
						</div>
					</div>
					<div>
						<div className='bg-gray-100 p-4 rounded-lg'>
							<AddressInputs disabled={true} addressProps={{ ...order }} />
						</div>
					</div>
				</div>
			)}
		</section>
	)
}
