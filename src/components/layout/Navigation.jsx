import { navbar } from '@/lib/navbarMenu'
import Link from 'next/link'

export default function Navigation() {
	return (
		<>
			{navbar.map(item => (
				<Link href={item.url} key={item.url}>
					{item.title}
				</Link>
			))}
		</>
	)
}
