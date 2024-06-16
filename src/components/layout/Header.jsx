'use client'

import { CartContext } from '@/context/CartContext'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useContext } from 'react'
import CartIcon from '../icons/Cart'
import AuthLinks from './AuthLinks'
import MobileMenu from './MobileMenu'
import Navigation from './Navigation'
export default function Header() {
	const session = useSession()
	const { status } = session
	const { cartProducts } = useContext(CartContext)
	const userData = session.data?.user
	let userName = userData?.name || userData?.email
	if (userName && userName.includes(' ')) {
		userName = userName.split(' ')[0]
	}

	return (
		<header>
			<MobileMenu
				cartProducts={cartProducts}
				status={status}
				userName={userName}
			/>
			<div className='hidden md:flex items-center justify-between'>
				<nav className='flex items-center gap-8 text-gray-500 font-semibold'>
					<Link className='text-primary font-semibold text-2xl' href='/'>
						ST PIZZA
					</Link>
					<Navigation />
				</nav>
				<nav className='flex items-center gap-4 text-gray-500 font-semibold'>
					<AuthLinks status={status} userName={userName} />
					<Link href='/cart' className='relative'>
						<CartIcon className='w-8 h-8' />
						{cartProducts?.length > 0 && (
							<span className='absolute -right-2 -top-2 bg-primary text-white p-1 rounded-full leading-3 text-xs'>
								{cartProducts.length}
							</span>
						)}
					</Link>
				</nav>
			</div>
		</header>
	)
}
