'use client'

import UserTabs from '@/components/layout/UserTabs'
import useProfile from '@/hooks/useProfile'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function UsersPage() {
	const [users, setUsers] = useState([])
	const { loading, data } = useProfile()
	const [loadingData, setLoadingData] = useState(true)

	useEffect(() => {
		fetch('/api/users')
			.then(response => response.json())
			.then(users => {
				setUsers(users)
				setLoadingData(false)
			})
	}, [])

	if (loading) {
		return (
			<h1 className='mt-8 text-primary text-lg text-center bg-white'>
				Loading...
			</h1>
		)
	}
	if (!data.admin) {
		return redirect('/')
	}

	return (
		<section className='mt-8 max-w-2xl mx-auto'>
			<UserTabs isAdmin={data.admin} />
			<div className='mt-8'>
				{loadingData && (
					<h1 className='mt-8 text-primary text-lg text-center bg-white'>
						Loading users...
					</h1>
				)}
				{users.length > 0 &&
					users.map(user => (
						<div
							key={user._id}
							className='bg-gray-100 rounded-lg mb-2 px-2 p-2 sm:p-1 sm:px-4 flex items-center gap-4'
						>
							<div className='grid md:grid-cols-3 gap-2 sm:gap-4 grow'>
								<div className='text-gray-900'>
									<span className={user.name ? '' : 'italic ' + 'truncate'}>
										{user.name || 'No name'}
									</span>
								</div>
								<span className='text-gray-500 text-[12px] sm:text-[16px] truncate'>
									{user.email}
								</span>
							</div>
							<div className='text-sm sm:text-[16px]'>
								<Link className='button' href={`/users/${user._id}`}>
									Edit
								</Link>
							</div>
						</div>
					))}
			</div>
		</section>
	)
}
