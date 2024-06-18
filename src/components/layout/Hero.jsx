import Image from 'next/legacy/image'
import Link from 'next/link'
import Right from '../icons/Right'
export default function Hero() {
	return (
		<section className='hero md:mt-4'>
			<div className='py-8 md:py-12'>
				<h1 className='text-4xl font-semibold'>
					Everything <br /> is better
					<br /> with a <span className='text-primary'>Pizza</span>
				</h1>
				<p className='my-6 text-gray-500 text-sm'>
					Pizza is the missing piece that makes every day complete, a simple yet
					delicious joy in life
				</p>
				<div className='flex gap-2 md:gap-4 text-sm'>
					<Link
						href='/menu'
						className=' bg-primary uppercase flex justify-center items-center gap-2 text-white px-4 py-2 rounded-full text-[12px] sm:text-[14px] w-full font-semibold'
					>
						Order now
						<Right />
					</Link>
					<button className='flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold text-[12px] sm:text-[14px]'>
						Learn more
						<Right />
					</button>
				</div>
			</div>
			<div className='relative hidden md:block'>
				<Image
					src={'/pizza.png'}
					layout={'fill'}
					objectFit={'contain'}
					alt={'pizza'}
					priority={true}
				/>
			</div>
		</section>
	)
}
