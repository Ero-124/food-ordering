import { useState } from 'react'
import ChevronDown from '../icons/ChevronDown'
import ChevronUp from '../icons/ChevronUp'
import Plus from '../icons/Plus'
import Trash from '../icons/Trash'

export default function MenuItemPriceProps({
	name,
	props,
	setProps,
	addLabel,
}) {
	const [isOpen, setIsOpen] = useState(false)
	const addProp = () => {
		setProps(oldSizes => {
			return [...oldSizes, { name: '', price: 0 }]
		})
	}

	const editProp = (e, index, prop) => {
		const newValue = e.target.value
		setProps(prevSizes => {
			const newSizes = [...prevSizes]
			newSizes[index][prop] = newValue
			return newSizes
		})
	}

	const removeProp = indexToRemove => {
		setProps(prev => prev.filter((v, index) => index !== indexToRemove))
	}

	return (
		<div className='bg-gray-200 p-2 rounded-md mb-2'>
			<button
				className='inline-flex p-1  border-0 justify-start'
				type='button'
				onClick={() => setIsOpen(prev => !prev)}
			>
				{isOpen ? <ChevronUp /> : <ChevronDown />}
				<span>{name}</span>
				<span>({props?.length})</span>
			</button>
			<div className={isOpen ? 'block' : 'hidden'}>
				{props.length > 0 &&
					props.map((size, index) => (
						<div className='flex items-end gap-2' key={size._id}>
							<div>
								<label>Name</label>
								<input
									type='text'
									placeholder='Size name'
									value={size.name}
									onChange={e => editProp(e, index, 'name')}
								/>
							</div>
							<div>
								<label>Extra price</label>
								<input
									type='text'
									placeholder='Extra price'
									value={size.price}
									onChange={e => editProp(e, index, 'price')}
								/>
							</div>
							<div>
								<button
									onClick={() => removeProp(index)}
									type='button'
									className='bg-white mb-2 px-2'
								>
									<Trash />
								</button>
							</div>
						</div>
					))}
				<button
					onClick={addProp}
					type='button'
					className='bg-white  items-center'
				>
					<Plus className='w-4 h-4' />
					<span>{addLabel}</span>
				</button>
			</div>
		</div>
	)
}
