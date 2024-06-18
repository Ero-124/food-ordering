import { useState } from 'react'

const DeleteButton = ({ label, onDelete }) => {
	const [showConfirm, setShowConfirm] = useState(false)

	if (showConfirm) {
		return (
			<div className='fixed bg-black/30 inset-0 flex items-center h-full justify-center'>
				<div className='bg-white p-4 rounded-lg'>
					<div className='text-center'>Are you sure you want to delete?</div>
					<div className='flex items-center gap-2 mt-1'>
						<button type='button' onClick={() => setShowConfirm(false)}>
							Cancel
						</button>
						<button
							type='button'
							className='primary'
							onClick={() => {
								onDelete()
								setShowConfirm(false)
							}}
						>
							Yes
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<button onClick={() => setShowConfirm(true)} type='button'>
			{label}
		</button>
	)
}

export default DeleteButton
