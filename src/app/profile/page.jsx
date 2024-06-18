'use client'
import UserForm from '@/components/layout/UserForm'
import UserTabs from '@/components/layout/UserTabs'
import ProfileSkeleton from '@/components/skeleton/ProfileSkeleton'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
export default function ProfilePage() {
	const session = useSession()

	const [user, setUser] = useState(null)
	const [isAdmin, setIsAdmin] = useState(false)
	const [profileFetched, setProfileFetched] = useState(false)
	const { status } = session

	useEffect(() => {
		if (status === 'authenticated') {
			fetch('/api/profile')
				.then(response => response.json())
				.then(data => {
					setUser(data)
					setIsAdmin(data.admin)
					setProfileFetched(true)
				})
		}
	}, [session, status])

	const handleProfileInfoUpdate = async (e, data) => {
		e.preventDefault()
		const savingPromise = new Promise(async (reslove, reject) => {
			const response = await fetch('api/profile', {
				method: 'PUT',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (response.ok) reslove()
			else reject()
		})
		await toast.promise(savingPromise, {
			loading: 'Saving...',
			success: 'Profile saved!',
			error: 'Error',
		})
	}

	if (status === 'unauthenticated') {
		return redirect('/login')
	}

	if (status === 'loading' || !profileFetched) {
		return <ProfileSkeleton />
	}

	return (
		<section className='mt-8'>
			<UserTabs isAdmin={isAdmin} />
			<div className='max-w-2xl mx-auto mt-8'>
				<UserForm user={user} onSave={handleProfileInfoUpdate} />
			</div>
		</section>
	)
}
