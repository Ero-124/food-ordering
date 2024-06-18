import SectionHeaders from './SectionHeaders'

export default function Contacts() {
	return (
		<section className='text-center my-8' id='contact'>
			<SectionHeaders subHeader={"Don't hesitate"} mainHeader={'Contact us'} />
			<div className='mt-3 sm:mt-8'>
				<a
					className='text-2xl sm:text-4xl underline text-gray-500'
					href='tel:099989796'
				>
					+374 99 98 97 96
				</a>
			</div>
		</section>
	)
}
