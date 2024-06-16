'use client'

import DeleteButton from '@/components/DeleteButton'
import Left from '@/components/icons/Left'
import MenuItemForm from '@/components/layout/MenuItemForm'
import UserTabs from '@/components/layout/UserTabs'
import { CartContext } from '@/context/CartContext'
import useProfile from '@/hooks/useProfile'
import Link from 'next/link'
import { redirect, useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function EditMenuItemPage() {
	const { id } = useParams()
	const { data, loading } = useProfile()
	const [menuItem, setMenuItem] = useState(null)
	const [redirectToItems, setRedirectToItems] = useState(false)
	const { cartProducts, setCartProducts } = useContext(CartContext)
	useEffect(() => {
		fetch('/api/menu-items')
			.then(res => res.json())
			.then(items => {
				const item = items.find(i => i._id === id)
				setMenuItem(item)
			})
	}, [])

	async function handleFormSubmit(e, data) {
		e.preventDefault()
		data = { ...data, _id: id }
		const savingPromise = new Promise(async (reslove, reject) => {
			const response = await fetch('/api/menu-items', {
				method: 'PUT',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (response.ok) {
				reslove()
				const updatedCartProducts = cartProducts.map(product => {
					if (product._id === id) {
						return { ...product, ...data }
					}
					return product
				})
				localStorage.setItem('cart', JSON.stringify(updatedCartProducts))
				setCartProducts(updatedCartProducts)
			} else {
				reject()
			}
		})
		await toast.promise(savingPromise, {
			loading: 'Saving...',
			success: 'Item saved!',
			error: 'Error',
		})

		setRedirectToItems(true)
	}

	const handleDeleteClick = async () => {
		const deletingPromise = new Promise(async (reslove, reject) => {
			const response = await fetch(`/api/menu-items?_id=${id}`, {
				method: 'DELETE',
			})
			if (response.ok) {
				reslove()
			} else {
				reject()
			}
		})
		await toast.promise(deletingPromise, {
			loading: 'Deleting...',
			success: 'Item deleted!',
			error: 'Error',
		})

		setRedirectToItems(true)
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
			<MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
			<div className='max-w-md mx-auto mt-2 '>
				<div className='md:max-w-xs ml-auto md:pl-24'>
					<DeleteButton
						label='Delete this menu item'
						onDelete={handleDeleteClick}
					/>
				</div>
			</div>
		</section>
	)
}
