import { CartContext } from '@/context/CartContext'
import Image from 'next/image'
import { useContext, useState } from 'react'
import FlyingButton from 'react-flying-item'
import MenuItemTile from './MenuItemTile'

export default function MenuItem(menuItem) {
	const { image, name, description, basePrice, sizes, extraIngridientPrices } =
		menuItem
	const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null)
	const [selectedExtras, setSelectedExtras] = useState([])
	const { addToCart } = useContext(CartContext)
	const [showPopup, setShowPopup] = useState(false)

	const handleAddToCartBtnClick = async () => {
		const hasOptions = sizes.length > 0 || extraIngridientPrices.length > 0
		if (hasOptions && !showPopup) {
			setShowPopup(true)
			return
		}
		addToCart(menuItem, selectedSize, selectedExtras)
		await new Promise(resolve => {
			setTimeout(resolve, 1000)
		})
		setShowPopup(false)
	}

	function handleExtraThingClick(e, extraThing) {
		const checked = e.target.checked
		if (checked) {
			setSelectedExtras(prev => [...prev, extraThing])
		} else {
			setSelectedExtras(prev => prev.filter(e => e.name !== extraThing.name))
		}
	}

	let selectedPrice = basePrice
	if (selectedSize) {
		selectedPrice += selectedSize.price
	}
	if (selectedExtras?.length > 0) {
		for (const extra of selectedExtras) {
			selectedPrice += extra.price
		}
	}

	return (
		<>
			{showPopup && (
				<div
					className='fixed inset-0 bg-black/80 flex items-center justify-center z-10'
					onClick={() => setShowPopup(false)}
				>
					<div
						className='my-8 bg-white p-2 rounded-lg max-w-md'
						onClick={e => e.stopPropagation()}
					>
						<div className='max-h-[92vh] overflow-y-scroll p-2'>
							<Image
								src={image}
								alt={name}
								width='0'
								height='0'
								sizes='100vw'
								style={{ width: '100%', height: '300px' }}
								className='mx-auto'
							/>
							<h2 className='text-lg font-bold text-center mb-2'>{name}</h2>
							<p className='text-center text-gray-500 text-sm mb-2'>
								{description}
							</p>
							{sizes?.length > 0 && (
								<div className='rounded-md p-2 '>
									<h3 className='text-center mb-2 text-gray-700'>
										Pick your sizes
									</h3>
									{sizes.map(size => (
										<label
											className='flex items-center gap-2 p-4 rounded-md mb-1 border'
											key={size._id}
										>
											<input
												onChange={() => setSelectedSize(size)}
												checked={selectedSize?.name === size.name}
												type='radio'
												name='size'
											/>
											{size.name} ${basePrice + size.price}
										</label>
									))}
								</div>
							)}
							{extraIngridientPrices?.length > 0 && (
								<div className='rounded-md p-2 '>
									<h3 className='text-center mb-2 text-gray-700'>Any extras</h3>
									{extraIngridientPrices.map(extraThing => (
										<label
											className='flex items-center gap-2 p-4 rounded-md mb-1 border'
											key={extraThing.name}
										>
											<input
												type='checkbox'
												name={extraThing.name}
												onClick={e => handleExtraThingClick(e, extraThing)}
											/>
											{extraThing.name} +${extraThing.price}
										</label>
									))}
								</div>
							)}
							<div className='primary sticky bottom-2 bg-white'>
								<FlyingButton targetTop='5%' targetLeft='95%' src={image}>
									<div type='button' onClick={handleAddToCartBtnClick}>
										Add to cart ${selectedPrice}
									</div>
								</FlyingButton>
							</div>

							<button
								className='mt-2'
								type='button'
								onClick={() => setShowPopup(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
			<MenuItemTile onAddToCart={handleAddToCartBtnClick} {...menuItem} />
		</>
	)
}
