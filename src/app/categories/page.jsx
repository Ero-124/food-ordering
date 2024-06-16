'use client'

import DeleteButton from '@/components/DeleteButton'
import UserTabs from '@/components/layout/UserTabs'
import useProfile from '@/hooks/useProfile'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function CategoriesPage() {
	const [categoryName, setCategoryName] = useState('')
	const [categories, setCategories] = useState([])
	const { data: profileData, loading: profileLoading } = useProfile()
	const [editedCategory, setEditedCategory] = useState(null)

	useEffect(() => {
		fetchCategories()
	}, [])

	function fetchCategories() {
		fetch('/api/categories')
			.then(response => response.json())
			.then(categories => {
				setCategories(categories)
			})
	}

	if (profileLoading) {
		return (
			<h1 className='mt-8 text-primary text-lg text-center bg-white'>
				Loading...
			</h1>
		)
	}

	if (!profileData.admin) {
		return redirect('/')
	}

	const handleCategorySubmit = async e => {
		e.preventDefault()
		const data = { name: categoryName }
		if (editedCategory) {
			data._id = editedCategory._id
		}
		const method = editedCategory ? 'PUT' : 'POST'

		try {
			const response = await fetch('/api/categories', {
				method: method,
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (response.ok) {
				toast.success(
					editedCategory ? 'Category updated!' : 'Category created!'
				)
				setCategoryName('')
				fetchCategories()
				setEditedCategory(null)
			} else {
				toast.error('Error')
			}
		} catch (error) {
			console.error('Error:', error)
			toast.error('Error')
		}
	}

	const handleDeleteClick = async id => {
		try {
			const response = await fetch(`/api/categories?_id=${id}`, {
				method: 'DELETE',
			})
			if (response.ok) {
				toast.success('Deleted successfully')
				fetchCategories()
			} else {
				toast.error('Error')
			}
		} catch (error) {
			console.error('Error:', error)
			toast.error('Error')
		}
	}

	return (
		<section className='mt-8 max-w-2xl mx-auto'>
			<UserTabs isAdmin={profileData.admin} />
			<form className='mt-8' onSubmit={handleCategorySubmit}>
				<div className='flex gap-2 items-end'>
					<div className='grow'>
						<label>
							{editedCategory ? 'Update category' : 'New category name'}
							{editedCategory && (
								<>
									: <b>{editedCategory.name}</b>
								</>
							)}
						</label>
						<input
							type='text'
							value={categoryName}
							onChange={e => setCategoryName(e.target.value)}
						/>
					</div>
					<div className='pb-2 flex gap-2'>
						<button className='border border-primary' type='submit'>
							{editedCategory ? 'Update' : 'Create'}
						</button>
						<button
							type='button'
							onClick={() => {
								setEditedCategory(null)
								setCategoryName('')
							}}
						>
							Cancel
						</button>
					</div>
				</div>
			</form>

			<div className=''>
				<h2 className='mt-8 text-sm text-gray-500'>Existing categories:</h2>
				{categories?.length > 0 &&
					categories.map(c => (
						<div
							key={c._id}
							className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 items-center  mb-1'
						>
							<div className='grow '>{c.name}</div>
							<div className='flex gap-1'>
								<button
									type='button'
									onClick={() => {
										setEditedCategory(c)
										setCategoryName(c.name)
									}}
								>
									Edit
								</button>
								<DeleteButton
									label='Delete'
									onDelete={() => handleDeleteClick(c._id)}
								/>
							</div>
						</div>
					))}
			</div>
		</section>
	)
}
