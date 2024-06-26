'use client'

import UserTabs from '@/components/layout/UserTabs'
import useProfile from '@/hooks/useProfile'
import { dbTimeForHuman } from '@/lib/datetime'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function OrdersPage() {
	const [orders, setOrders] = useState([])
	const { loading, data: profile } = useProfile()
	const [loadingOrders, setLoadingOrders] = useState(true)

	useEffect(() => {
		fetchOrders()
	}, [])

	async function fetchOrders() {
		try {
			const response = await fetch('/api/orders')
			const orders = await response.json()
			if (orders?.length > 0) {
				setOrders(orders.reverse())
				setLoadingOrders(false)
			}
		} catch (error) {
			console.log(error)
		}
	}

	if (loading) {
		return (
			<h1 className='mt-8 text-primary text-lg text-center bg-white'>
				Loading...
			</h1>
		)
	}

	if (!profile?.email) {
		return redirect('/')
	}

	return (
		<section className='mt-8 max-w-2xl mx-auto'>
			<UserTabs isAdmin={profile.admin} />
			<div className='mt-8'>
				{loadingOrders && <div>Loading orders...</div>}
				{orders?.length > 0 &&
					orders.map(order => (
						<div
							key={order._id}
							className='bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6'
						>
							<div className='grow flex flex-col md:flex-row items-center gap-6'>
								<div>
									<div
										className={
											(order.paid ? 'bg-green-500' : 'bg-red-400') +
											' p-2 rounded-md text-white w-24 text-center'
										}
									>
										{order.paid ? 'Paid' : 'Not paid'}
									</div>
								</div>
								<div className='grow'>
									<div className='flex-col-reverse sm:flex-row flex gap-2 items-center mb-1'>
										<div className='grow'>{order.userEmail}</div>
										<div className='text-gray-500 text-sm'>
											{dbTimeForHuman(order.createdAt)}
										</div>
									</div>
									<div className='text-gray-500 text-xs'>
										{order.cartProducts.map(p => p.name).join(', ')}
									</div>
								</div>
							</div>
							<div className='justify-end flex gap-2 items-center whitespace-nowrap'>
								<Link href={'/orders/' + order._id} className='button'>
									Show order
								</Link>
							</div>
						</div>
					))}
			</div>
		</section>
	)
}
