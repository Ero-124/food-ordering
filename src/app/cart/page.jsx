'use client'

import AddressInputs from '@/components/layout/AddressInputs'
import SectionHeaders from '@/components/layout/SectionHeaders'
import CartProduct from '@/components/menu/CartProduct'
import { DELIVERY_PRICE } from '@/constant/const'
import { CartContext, cartProductPrice } from '@/context/CartContext'
import useProfile from '@/hooks/useProfile'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import uniqid from 'uniqid'
export default function CartPage() {
	const { cartProducts, removeCartProduct } = useContext(CartContext)
	const [address, setAddress] = useState({
		phone: '',
		streetAddress: '',
		city: '',
		postalCode: '',
		country: '',
	})
	const [loading, setLoading] = useState(true)
	const { data: profileData } = useProfile()

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (window.location.href.includes('canceled=1')) {
				toast.error('Payment failed 😕')
			}
		}
	}, [])

	useEffect(() => {
		if (profileData?.city) {
			const { phone, streetAddress, city, postalCode, country } = profileData
			const addressFromProfile = {
				phone,
				streetAddress,
				city,
				postalCode,
				country,
			}
			setAddress(addressFromProfile)
		}
	}, [profileData])

	function handleAddressChange(propName, value) {
		setAddress(prevAddress => {
			return {
				...prevAddress,
				[propName]: value,
			}
		})
	}

	let subtotal = 0
	for (const p of cartProducts) {
		subtotal += cartProductPrice(p)
	}

	useEffect(() => {
		const id = setTimeout(() => {
			setLoading(false)
		})
		return () => {
			clearTimeout(id)
		}
	}, [])

	async function proceedToCheckout(e) {
		e.preventDefault()
		const promise = new Promise((resolve, reject) => {
			fetch('/api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					cartProducts,
					address,
				}),
			}).then(async response => {
				if (response.ok) {
					resolve()
					window.location = await response.json()
				} else {
					reject()
				}
			})
		})
		await toast.promise(promise, {
			loading: 'Preparing your order...',
			success: 'Redirecting to payment...',
			error: 'Something went wrong... Please try again later.',
		})
	}

	if (loading) {
		return (
			<h1 className='absolute -translate-y-1/2  -translate-x-1/2 top-1/2 left-1/2  text-primary text-4xl'>
				Loading...
			</h1>
		)
	}

	if (cartProducts?.length === 0) {
		return (
			<section className='mt-8 text-center'>
				<SectionHeaders mainHeader='Cart' />
				<p className='mt-4'>Your shopping cart is empty</p>
			</section>
		)
	}

	return (
		<section className='mt-8'>
			<div className='text-center'>
				<SectionHeaders mainHeader='Cart' />
			</div>
			<div className='mt-2 md:mt-8 md:grid md:grid-cols-2 gap-8'>
				<div>
					{cartProducts?.length > 0 ? (
						cartProducts.map((product, index) => (
							<CartProduct
								key={uniqid()}
								index={index}
								product={product}
								onRemove={removeCartProduct}
							/>
						))
					) : (
						<div>No products in your shopping cart</div>
					)}
					<div className='py-2 justify-end pr-2 md:pr-16 flex items-center'>
						<div className='text-gray-500 flex flex-col gap-1'>
							<span>Subtotal:</span>
							<span>Delivery:</span>
							<span>Total:</span>
						</div>
						<div className='text-lg font-semibold pl-2 text-right flex flex-col '>
							<span>${subtotal}</span>
							<span>${DELIVERY_PRICE}</span>
							<span> ${subtotal + DELIVERY_PRICE}</span>
						</div>
					</div>
				</div>
				<div className='bg-gray-100 p-4 rounded-lg '>
					<div className='sticky top-0'>
						<h2>Checkout</h2>
						<form onSubmit={proceedToCheckout}>
							<AddressInputs
								addressProps={address}
								setAddressProp={handleAddressChange}
							/>
							<button type='submit'>Pay ${subtotal + DELIVERY_PRICE}</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}
