'use client'

import UserForm from '@/components/layout/UserForm'
import UserTabs from '@/components/layout/UserTabs'
import useProfile from '@/hooks/useProfile'
import { redirect, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function EditUserPage() {
	const { loading, data } = useProfile()
	const { id } = useParams()
	const [user, setUser] = useState(null)
	useEffect(() => {
		fetch('/api/profile?_id=' + id)
			.then(response => response.json())
			.then(user => {
				setUser(user)
			})
	}, [])

	const handleSaveButtonClick = async (e, data) => {
		e.preventDefault()
		try {
			const response = await fetch('/api/profile', {
				method: 'PUT',
				body: JSON.stringify({ ...data, _id: id }),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (response.ok) {
				toast.success('User saved successfully')
			} else {
				toast.error('Something went wrong')
			}
		} catch (error) {
			console.error(error)
			toast.error('Something went wrong')
		}
	}

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
		<section className='max-w-2xl mx-auto mt-8'>
			<UserTabs isAdmin={data.admin} />
			<div className='mt-8'>
				<UserForm user={user} onSave={handleSaveButtonClick} />
			</div>
		</section>
	)
}
