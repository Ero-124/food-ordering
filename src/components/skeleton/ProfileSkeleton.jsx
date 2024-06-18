import { Skeleton } from '@nextui-org/skeleton'
import TabsSkeleton from './TabsSkeleton'

export default function ProfileSkeleton() {
	return (
		<>
			<TabsSkeleton />
			<div className='flex md:flex-row flex-col gap-4 max-w-2xl mx-auto mt-8'>
				<div className='space-y-2'>
					<Skeleton>
						<div className='w-24 h-24 bg-gray-500 rounded-lg'></div>
					</Skeleton>
					<Skeleton>
						<div className='w-24 h-12 bg-gray-500 rounded-lg'></div>
					</Skeleton>
				</div>
				<div className='space-y-3 w-full'>
					<Skeleton>
						<div className='w-24 h-3 rounded-md bg-gray-500'></div>
						<div className='w-full h-8 rounded-lg bg-gray-500 mt-2'></div>
					</Skeleton>
					<Skeleton>
						<div className='w-24 h-3 rounded-md bg-gray-500'></div>
						<div className='w-full h-8 rounded-lg bg-gray-500 mt-2'></div>
					</Skeleton>
					<Skeleton>
						<div className='w-24 h-3 rounded-md bg-gray-500'></div>
						<div className='w-full h-8 rounded-lg bg-gray-500 mt-2'></div>
					</Skeleton>
					<Skeleton>
						<div className='w-24 h-3 rounded-md bg-gray-500'></div>
						<div className='w-full h-8 rounded-lg bg-gray-500 mt-2'></div>
					</Skeleton>
					<Skeleton>
						<div className='w-24 h-3 rounded-md bg-gray-500'></div>
						<div className='w-full h-8 rounded-lg bg-gray-500 mt-2'></div>
					</Skeleton>
					<Skeleton>
						<div className='w-24 h-3 rounded-md bg-gray-500'></div>
						<div className='w-full h-8 rounded-lg bg-gray-500 mt-2'></div>
					</Skeleton>
				</div>
			</div>
		</>
		/* <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
			<Card className='h-72 space-y-2 rounded-lg bg-gray-600 p-4 ' radius='lg'>
				<Skeleton>
					<div className='w-24 h-24 mx-auto bg-gray-500 rounded-full'></div>
				</Skeleton>
				<div className='space-y-3'>
					<Skeleton>
						<div className='w-24 h-3 mx-auto bg-gray-500 rounded-lg my-3'></div>
					</Skeleton>
					<Skeleton className='rounded-lg'>
						<div className='w-full h-3 rounded-lg bg-gray-500'></div>
					</Skeleton>
					<Skeleton className='rounded-lg'>
						<div className='w-[90%] h-3 mx-auto rounded-lg bg-gray-500'></div>
					</Skeleton>
					<Skeleton className='rounded-lg'>
						<div className='w-[80%] h-3 mx-auto rounded-lg bg-gray-500'></div>
					</Skeleton>
					<Skeleton className='rounded-lg'>
						<div className='h-6 rounded-full bg-gray-500'></div>
					</Skeleton>
				</div>
			</Card>
		</div> */
	)
}
