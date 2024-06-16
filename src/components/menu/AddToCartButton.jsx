import FlyingButton from 'react-flying-item'
export default function AddToCartButton({
	hasSizesOrExtras,
	onClick,
	basePrice,
	image,
}) {
	if (!hasSizesOrExtras) {
		return (
			<div className='flying-button-parent mt-4'>
				<FlyingButton src={image} targetTop={'5%'} targetLeft={'95%'}>
					<div onClick={onClick}>Add to cart ${basePrice}</div>
				</FlyingButton>
			</div>
		)
	}
	return (
		<button
			onClick={onClick}
			className='bg-primary text-white rounded-full px-8 py-2 mt-4'
		>
			<span>Add to cart (from ${basePrice})</span>
		</button>
	)
}
