import { Skeleton } from '@nextui-org/skeleton'

export default function TabsSkeleton() {
	return (
		<div className='flex mx-auto gap-2 tabs justify-center flex-wrap'>
			<Skeleton>
				<div className='w-12 h-5'></div>
			</Skeleton>
			<Skeleton>
				<div className='w-12 h-5'></div>
			</Skeleton>
			<Skeleton>
				<div className='w-12 h-5'></div>
			</Skeleton>
			<Skeleton>
				<div className='w-12 h-5'></div>
			</Skeleton>
			<Skeleton>
				<div className='w-12 h-5'></div>
			</Skeleton>
		</div>
	)
}
