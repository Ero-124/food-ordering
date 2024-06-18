'use client'

import Right from '@/components/icons/Right'
import UserTabs from '@/components/layout/UserTabs'
import useProfile from '@/hooks/useProfile'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MenuItemsPage() {
	const [menuItems, setMenuItems] = useState([])
	const { data: profile, loading } = useProfile()
	useEffect(() => {
		fetch('/api/menu-items')
			.then(response => response.json())
			.then(menuItems => {
				setMenuItems(menuItems)
			})
	}, [])

	if (loading) {
		return (
			<h1 className='mt-8 text-primary text-lg text-center bg-white'>
				Loading...
			</h1>
		)
	}
	if (!profile.admin) {
		return redirect('/')
	}

	return (
		<section className='mt-8 max-w-2xl mx-auto'>
			<UserTabs isAdmin={profile.admin} />
			<div className='mt-8'>
				<Link href='/menu-items/new' className='button flex'>
					<span>Create new menu item</span>
					<Right />
				</Link>
			</div>
			<div>
				<h2 className='text-sm text-gray-500 mt-8'>Edit menu item:</h2>
				<div className='grid lg:grid-cols-3 md:grid-cols-2 gap-2'>
					{menuItems.length > 0 &&
						menuItems.map(item => (
							<Link
								href={`/menu-items/edit/${item._id}`}
								key={item._id}
								className='bg-gray-200 rounded-lg p-4'
							>
								<div className='relative flex justify-center'>
									<Image
										src={item.image}
										alt={item.name}
										width='0'
										height='0'
										sizes='100vw'
										style={{ width: '200px', height: '200px' }}
										priority={true}
										className='rounded-md'
									/>
								</div>
								<div className='text-center'>{item.name}</div>
							</Link>
						))}
				</div>
			</div>
		</section>
	)
}
