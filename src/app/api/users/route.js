import { connectToDb } from '@/lib/utils'
import { User } from '@/models/User'
import { isAdmin } from '../auth/[...nextauth]/route'

export async function GET() {
	connectToDb()
	if (await isAdmin()) {
		const users = await User.find()
		return Response.json(users)
	} else {
		return Response.json([])
	}
}
