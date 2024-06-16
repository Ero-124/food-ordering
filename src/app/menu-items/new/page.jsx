'use client'
import Left from '@/components/icons/Left'
import MenuItemForm from '@/components/layout/MenuItemForm'
import UserTabs from '@/components/layout/UserTabs'
import useProfile from '@/hooks/useProfile'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function NewMenuItemPage() {
	const { data, loading } = useProfile()
	const [redirectToItems, setRedirectToItems] = useState(false)

	async function handleFormSubmit(e, data) {
		e.preventDefault()
		try {
			const response = await fetch('/api/menu-items', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (response.ok) {
				toast.success('Item saved!')
				setRedirectToItems(true)
			} else {
				toast.error('Error')
			}
		} catch (error) {
			console.error(error)
			toast.error('Error')
		}
	}
	if (redirectToItems) {
		return redirect('/menu-items')
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
		<section className='mt-8'>
			<UserTabs isAdmin={data.admin} />
			<div className='max-w-2xl mx-auto mt-8'>
				<Link href='/menu-items' className='button'>
					<Left />
					<span>Show all menu items</span>
				</Link>
			</div>
			<MenuItemForm onSubmit={handleFormSubmit} menuItem={null} />
		</section>
	)
}
