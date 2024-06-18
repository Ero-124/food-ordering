import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import CartIcon from '../icons/Cart'
import Hamburger from '../icons/Hamburger'
import AuthLinks from './AuthLinks'
import Navigation from './Navigation'

export default function MobileMenu({ cartProducts, status, userName }) {
	const [mobileNavOpen, setMobileNavOpen] = useState(false)
	const menuRef = useRef(null)

	const handleClickOutside = event => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setMobileNavOpen(false)
		}
	}
	useEffect(() => {
		if (mobileNavOpen) {
			document.addEventListener('click', handleClickOutside)
		} else {
			document.removeEventListener('click', handleClickOutside)
		}
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [mobileNavOpen])

	return (
		<>
			<div className='flex md:hidden  items-center justify-between'>
				<Link className='text-primary font-semibold text-2xl' href='/'>
					<Image src='/pizza-logo.png' alt='Pizza' width={80} height={80} />
				</Link>
				<div className='flex gap-8 items-center'>
					<Link href='/cart' className='relative'>
						<CartIcon className='w-8 h-8' />
						{cartProducts?.length > 0 && (
							<span className='absolute -right-2 -top-2 bg-primary text-white p-1 rounded-full leading-3 text-xs'>
								{cartProducts.length}
							</span>
						)}
					</Link>
					<button
						className='p-1 border'
						onClick={() => setMobileNavOpen(prev => !prev)}
					>
						<Hamburger />
					</button>
				</div>
			</div>
			{mobileNavOpen && (
				<div
					ref={menuRef}
					className='md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center'
					onClick={() => setMobileNavOpen(false)}
				>
					<Navigation />
					<AuthLinks status={status} userName={userName} />
				</div>
			)}
		</>
	)
}
