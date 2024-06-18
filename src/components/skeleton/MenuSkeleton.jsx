import { Card, Skeleton } from '@nextui-org/react'
export default function MenuSkeleton({ listsToRender }) {
	return (
		<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{Array(listsToRender)
				.fill(1)
				.map((_, index) => (
					<Card
						className='h-72 space-y-2 rounded-lg bg-gray-600 p-4 '
						radius='lg'
						key={index}
					>
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
				))}
		</div>
	)
}
