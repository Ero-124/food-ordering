import { signOut } from 'next-auth/react'
import Link from 'next/link'
import User from '../icons/User'

export default function AuthLinks({ status, userName }) {
	return status === 'loading' ? (
		<div className='flex justify-center'>
			<User className='w-8 h-8' />
		</div>
	) : status === 'authenticated' ? (
		<>
			<Link href='/profile' className='whitespace-nowrap'>
				Hello {userName}
			</Link>
			<button
				onClick={() => signOut()}
				href={'/register'}
				className='bg-primary rounded-full text-white px-8 py-2'
			>
				Logout
			</button>
		</>
	) : (
		<>
			<Link href={'/login'}>Login</Link>
			<Link
				href={'/register'}
				className='bg-primary rounded-full text-white px-8 py-2'
			>
				Register
			</Link>
		</>
	)
}
