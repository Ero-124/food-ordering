import Image from 'next/image'
import AddToCartButton from './AddToCartButton'

export default function MenuItemTile({ onAddToCart, ...item }) {
	const { image, name, description, basePrice, sizes, extraIngridientPrices } =
		item
	const hasSizesOrExtras = sizes.length > 0 || extraIngridientPrices.length > 0
	return (
		<div className='bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all flex flex-col'>
			<div className='text-center relative'>
				<Image
					className='max-h-24 block mx-auto'
					src={image}
					alt={name}
					width={200}
					height={0}
					style={{ width: 'auto', height: '200px' }}
				/>
			</div>

			<h4 className='font-semibold text-xl my-3'>{name}</h4>
			<p
				title={description}
				className='text-gray-500 text-sm  line-clamp-3 flex-1'
			>
				{description}
			</p>
			<AddToCartButton
				basePrice={basePrice}
				onClick={onAddToCart}
				hasSizesOrExtras={hasSizesOrExtras}
				image={image}
			/>
		</div>
	)
}
