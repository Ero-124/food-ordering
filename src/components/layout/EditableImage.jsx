import Image from 'next/image'
import toast from 'react-hot-toast'

export default function EditableImage({ link, setLink, setFinishUpload }) {
	const handleFileChange = async e => {
		const files = e.target.files
		if (files?.length === 1) {
			const data = new FormData()
			data.set('file', files[0])
			setFinishUpload(false)
			const uploadPromise = fetch('/api/upload', {
				method: 'POST',
				body: data,
			}).then(response => {
				if (response.ok) {
					return response.json().then(link => {
						setLink(link)
						setFinishUpload(true)
					})
				}
				throw new Error('Somethin went wrong!')
			})
			await toast.promise(uploadPromise, {
				loading: 'Uploading...',
				success: 'Upload complete!',
				error: 'Upload failed!',
			})
		}
	}

	return (
		<>
			{link && (
				<Image
					className='rounded-lg w-full h-full mb-1'
					src={link}
					alt='Avatar'
					width={250}
					height={250}
				/>
			)}
			{!link && (
				<div className='bg-gray-200 p-4 text-gray-500 rounded-lg mb-1 text-center'>
					No image
				</div>
			)}
			<label>
				<input type='file' className='hidden' onChange={handleFileChange} />
				<span className='block border border-gray-300 cursor-pointer rounded-lg p-2 text-center'>
					Change image
				</span>
			</label>
		</>
	)
}
