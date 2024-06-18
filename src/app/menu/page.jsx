'use client'
import SectionHeaders from '@/components/layout/SectionHeaders'
import MenuItem from '@/components/menu/MenuItem'
import MenuSkeleton from '@/components/skeleton/MenuSkeleton'
import React, { useEffect, useMemo, useState } from 'react'

export default function MenuPage() {
	const [categories, setCategories] = useState([])
	const [menuItems, setMenuItems] = useState([])
	const [loading, setLoading] = useState(true)
	const [showErrorMessage, setShowErrorMessage] = useState('')

	const MemoizedMenuItem = React.memo(MenuItem)
	const MemoizedSectionHeaders = React.memo(SectionHeaders)
	const memoizedCategories = useMemo(() => categories, [categories])

	useEffect(() => {
		let isMounted = true
		const fetchData = async () => {
			try {
				const [menuResponse, categoriesResponse] = await Promise.all([
					fetch('/api/menu-items').then(response => {
						if (!response.ok) {
							throw new Error('Failed to fetch menu items')
						}
						return response.json()
					}),
					fetch('/api/categories').then(response => {
						if (!response.ok) {
							throw new Error('Failed to fetch categories')
						}
						return response.json()
					}),
				])

				if (isMounted) {
					setMenuItems(menuResponse)
					setCategories(categoriesResponse)
					setLoading(false)
				}
			} catch (error) {
				console.error('Error fetching data:', error)
				setShowErrorMessage('Failed to load data. Please try again later.')
				setLoading(false)
			}
		}
		fetchData()

		return () => {
			isMounted = false
		}
	}, [])
	return (
		<section className='mt-8'>
			{loading && <MenuSkeleton listsToRender={3} />}
			{showErrorMessage && (
				<div className='text-center'>
					<div className='spinner-border text-primary' role='status'>
						<span className='visually-hidden'>{showErrorMessage}</span>
					</div>
				</div>
			)}

			{memoizedCategories?.length > 0 &&
				memoizedCategories
					.slice()
					.reverse()
					.map(c => (
						<div key={c._id}>
							<div className='text-center'>
								<MemoizedSectionHeaders mainHeader={c.name} />
							</div>
							<div className='grid lg:grid-cols-3 md:grid-cols-2  gap-4 mt-4 mb-8'>
								{menuItems?.length > 0 &&
									menuItems
										.filter(item => item.category === c._id)
										.map(item => <MemoizedMenuItem {...item} key={item._id} />)}
							</div>
						</div>
					))}
		</section>
	)
}
