export default function Loading() {
	return (
		<div className='fixed inset-0 z-10 bg-gray-400/60 flex items-center justify-center'>
			<div
				className='inline-block h-16 text-primary w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
				role='status'
			>
				<span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
					Loading...
				</span>
			</div>
		</div>
	)
}
