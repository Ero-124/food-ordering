'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import MenuItem from '../menu/MenuItem'
import SectionHeaders from './SectionHeaders'
export default function HomeMenu() {
	const [bestSellers, setBestSellers] = useState([])
	useEffect(() => {
		fetch('/api/menu-items').then(res => {
			res.json().then(menuItems => {
				setBestSellers(menuItems.slice(-3))
			})
		})
	}, [])
	return (
		<section className=''>
			<div className='absolute left-0 right-0 w-full max-w-4xl mx-auto'>
				<div className='  absolute left-0 -top-[70px] -z-10'>
					<Image src='/sallad1.png' alt='salad' width={109} height={189} />
				</div>
				<div className=' absolute -top-[100px] right-0 -z-10'>
					<Image src='/sallad2.png' alt='salad' width={107} height={195} />
				</div>
			</div>
			<div className='text-center mb-4'>
				<SectionHeaders
					mainHeader={'Our Best Sellers'}
					subHeader={'check out'}
				/>
			</div>
			<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{bestSellers?.length > 0 &&
					bestSellers.map(item => <MenuItem key={item._id} {...item} />)}
			</div>
		</section>
	)
}
