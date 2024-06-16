import { useEffect, useState } from 'react'
import EditableImage from './EditableImage'
import MenuItemPriceProps from './MenuItemPriceProps'

export default function MenuItemForm({ onSubmit, menuItem }) {
	const [image, setImage] = useState(menuItem?.image || '')
	const [name, setName] = useState(menuItem?.name || '')
	const [description, setDescription] = useState(menuItem?.description || '')
	const [categories, setCategories] = useState([])
	const [category, setCategory] = useState(menuItem?.category || '')
	const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '')
	const [sizes, setSizes] = useState(menuItem?.sizes || [])
	const [extraIngridientPrices, setExtraIngridientPrices] = useState(
		menuItem?.extraIngridientPrices || []
	)
	const [finishUpload, setFinishUpload] = useState(true)

	useEffect(() => {
		fetch('/api/categories')
			.then(response => response.json())
			.then(categories => {
				setCategories(categories)
				if (category.length === 0) {
					setCategory(categories[0]?.id)
				}
			})
	}, [])

	return (
		<form
			className='mt-8 max-w-2xl mx-auto'
			onSubmit={ev =>
				onSubmit(ev, {
					image,
					name,
					description,
					basePrice,
					sizes,
					extraIngridientPrices,
					category,
				})
			}
		>
			<div
				className='md:grid items-start gap-4'
				style={{ gridTemplateColumns: '.3fr .7fr' }}
			>
				<div>
					<EditableImage
						link={image}
						setLink={setImage}
						setFinishUpload={setFinishUpload}
					/>
				</div>
				<div className='grow'>
					<label>Item name</label>
					<input
						type='text'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<label>Description</label>
					<input
						type='text'
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
					<label>Category</label>
					<select value={category} onChange={e => setCategory(e.target.value)}>
						{categories?.length > 0 &&
							categories.map(c => (
								<option value={c._id} key={c._id}>
									{c.name}
								</option>
							))}
					</select>
					<label>Base Price</label>
					<input
						type='text'
						value={basePrice}
						onChange={e => setBasePrice(e.target.value)}
					/>
					<MenuItemPriceProps
						name='Sizes'
						addLabel='Add item size'
						props={sizes}
						setProps={setSizes}
					/>
					<MenuItemPriceProps
						props={extraIngridientPrices}
						setProps={setExtraIngridientPrices}
						name='Extra ingredients'
						addLabel='Add ingredients prices'
					/>
					<button type='submit' disabled={!finishUpload}>
						Save
					</button>
				</div>
			</div>
		</form>
	)
}
