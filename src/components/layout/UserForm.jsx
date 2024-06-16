'use client'

import useProfile from '@/hooks/useProfile'
import { useState } from 'react'
import AddressInputs from './AddressInputs'
import EditableImage from './EditableImage'

export default function UserForm({ user, onSave }) {
	const [userName, setUserName] = useState(user?.name || '')
	const [image, setImage] = useState(user?.image || '')
	const [phone, setPhone] = useState(user?.phone || '')
	const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '')
	const [postalCode, setPostalCode] = useState(user?.postalCode || '')
	const [city, setCity] = useState(user?.city || '')
	const [country, setCountry] = useState(user?.country || '')
	const [admin, setAdmin] = useState(user?.admin || false)
	const { data: loggedInUserData } = useProfile()

	function handleAddressChange(propName, value) {
		if (propName === 'phone') setPhone(value)
		if (propName === 'streetAddress') setStreetAddress(value)
		if (propName === 'city') setCity(value)
		if (propName === 'country') setCountry(value)
		if (propName === 'postalCode') setPostalCode(value)
	}

	return (
		<div className='md:flex gap-4'>
			<div>
				<div className='p-2 rounded-lg relative max-w-[120px]'>
					<EditableImage link={image} setLink={setImage} />
				</div>
			</div>
			<form
				className='grow'
				onSubmit={e =>
					onSave(e, {
						name: userName,
						image,
						phone,
						streetAddress,
						city,
						postalCode,
						country,
						admin,
					})
				}
			>
				<label>
					First and last name
					<input
						type='text'
						placeholder='First and last name'
						value={userName}
						onChange={e => setUserName(e.target.value)}
					/>
				</label>
				<label>
					Email
					<input type='email' disabled value={user?.email} />
				</label>
				<AddressInputs
					addressProps={{ phone, streetAddress, city, country, postalCode }}
					setAddressProp={handleAddressChange}
				/>
				{loggedInUserData.admin && (
					<div>
						<label
							className='p-2 inline-flex items-center gap-2 mb-2'
							htmlFor='adminCb'
						>
							<input
								value={'1'}
								checked={admin}
								onChange={ev => setAdmin(ev.target.checked)}
								id='adminCb'
								type='checkbox'
							/>
							<span>Admin</span>
						</label>
					</div>
				)}
				<button type='submit'>Save</button>
			</form>
		</div>
	)
}
