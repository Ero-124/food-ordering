'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

const UserTabs = ({ isAdmin }) => {
	const path = usePathname()

	// Мемоизация классов активных ссылок
	const activeClassProfile = useMemo(
		() => (path === '/profile' ? 'active' : ''),
		[path]
	)
	const activeClassCategories = useMemo(
		() => (path === '/categories' ? 'active' : ''),
		[path]
	)
	const activeClassMenuItems = useMemo(
		() => (path.includes('menu-items') ? 'active' : ''),
		[path]
	)
	const activeClassUsers = useMemo(
		() => (path.includes('users') ? 'active' : ''),
		[path]
	)
	const activeClassOrders = useMemo(
		() => (path === '/orders' ? 'active' : ''),
		[path]
	)

	return (
		<div className='flex mx-auto gap-2 tabs justify-center flex-wrap'>
			<Link className={activeClassProfile} href='/profile'>
				Profile
			</Link>
			{isAdmin && (
				<>
					<Link className={activeClassCategories} href='/categories'>
						Categories
					</Link>
					<Link className={activeClassMenuItems} href='/menu-items'>
						Menu items
					</Link>
					<Link className={activeClassUsers} href='/users'>
						Users
					</Link>
				</>
			)}
			<Link className={activeClassOrders} href='/orders'>
				Orders
			</Link>
		</div>
	)
}

export default UserTabs
