import { connectToDb } from '@/lib/utils'
import { User } from '@/models/User'
import bcrypt from 'bcryptjs'
export async function POST(req) {
	connectToDb()
	const body = await req.json()
	const pass = body.password
	if (!pass?.length || pass.length < 5) {
		new Error('Password must be at least 5 characters')
	}
	const notHashedPassword = pass
	const salt = bcrypt.genSaltSync(10)
	body.password = bcrypt.hashSync(notHashedPassword, salt)

	const createdUser = await User.create(body)
	return Response.json(createdUser)
}
