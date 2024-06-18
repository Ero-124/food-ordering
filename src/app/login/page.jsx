'use client'
import useProfile from '@/hooks/useProfile'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useState } from 'react'
export default function LoginPage() {
	const { data: profile, loading } = useProfile()
	const session = useSession()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loginInProgress, setLoginInProgress] = useState(false)
	const handleFormSubmit = async e => {
		e.preventDefault()
		setLoginInProgress(true)
		await signIn('credentials', { email, password, callbackUrl: '/' })
		setLoginInProgress(false)
	}

	if (loading) {
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
	if (session.status === 'authenticated') {
		return redirect('/')
	}

	return (
		<section className='mt-8'>
			<h1 className='text-center text-primary text-4xl mb-4'>Login</h1>
			<form className='max-w-xs mx-auto' onSubmit={handleFormSubmit}>
				<input
					type='email'
					name='email'
					placeholder='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					disabled={loginInProgress}
				/>
				<input
					type='password'
					name='password'
					placeholder='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					disabled={loginInProgress}
				/>
				<button type='submit' disabled={loginInProgress}>
					Login
				</button>
				<div className='my-4 text-center text-gray-500'>
					or login with provider
				</div>
				<button
					onClick={() => signIn('google', { callbackUrl: '/' })}
					disabled={loginInProgress}
					className='flex gap-4 justify-center'
					type='button'
				>
					<Image src={'/google.png'} alt='google' width={24} height={24} />
					Login with Google
				</button>
			</form>
		</section>
	)
}
