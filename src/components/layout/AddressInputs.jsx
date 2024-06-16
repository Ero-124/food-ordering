export default function AddressInputs({
	addressProps,
	setAddressProp,
	disabled = false,
}) {
	const { phone, streetAddress, postalCode, city, country } = addressProps
	return (
		<>
			<label>
				Phone number
				<input
					disabled={disabled}
					type='tel'
					placeholder='Phone number'
					value={phone}
					onChange={e => setAddressProp('phone', e.target.value)}
				/>
			</label>
			<label>
				Street address
				<input
					disabled={disabled}
					type='text'
					placeholder='Street address'
					value={streetAddress}
					onChange={e => setAddressProp('streetAddress', e.target.value)}
				/>
			</label>

			<div className=' gap-2 grid grid-cols-2'>
				<label>
					Postal code
					<input
						disabled={disabled}
						type='text'
						placeholder='Postal code'
						value={postalCode}
						onChange={e => setAddressProp('postalCode', e.target.value)}
					/>
				</label>
				<label>
					City
					<input
						disabled={disabled}
						style={{ margin: '0' }}
						type='text'
						placeholder='City'
						value={city}
						onChange={e => setAddressProp('city', e.target.value)}
					/>
				</label>
			</div>
			<label>
				Country
				<input
					disabled={disabled}
					type='text'
					placeholder='Country'
					value={country}
					onChange={e => setAddressProp('country', e.target.value)}
				/>
			</label>
		</>
	)
}
