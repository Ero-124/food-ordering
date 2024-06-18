import SectionHeaders from './SectionHeaders'

export default function AboutUs() {
	return (
		<section className='text-center my-5 sm:my-16' id='about'>
			<SectionHeaders subHeader={'Our story'} mainHeader={'About us'} />
			<div className='text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4'>
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
					minus, ex, consequuntur quidem unde distinctio architecto tenetur
					expedita ad veritatis ut? Placeat voluptates quasi dolor iste,
					corporis omnis distinctio consectetur.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
					doloremque reprehenderit perferendis autem id ullam corporis
					recusandae molestiae commodi ea!
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
					perferendis.
				</p>
			</div>
		</section>
	)
}
