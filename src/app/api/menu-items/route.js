import { connectToDb } from '@/lib/utils'
import { MenuItem } from '@/models/MenuItem'
import { isAdmin } from '../auth/[...nextauth]/route'

export const GET = async () => {
	connectToDb()
	return Response.json(await MenuItem.find())
}

export const POST = async req => {
	connectToDb()
	const data = await req.json()
	if (await isAdmin()) {
		const menuItemDoc = await MenuItem.create(data)
		return Response.json(menuItemDoc)
	} else {
		return Response.json(true)
	}
}

export const PUT = async req => {
	connectToDb()
	const { _id, ...data } = await req.json()
	if (await isAdmin()) {
		await MenuItem.findByIdAndUpdate({ _id }, data)
		return Response.json(true)
	} else {
		return Response.json(true)
	}
}

export async function DELETE(req) {
	connectToDb()
	const url = new URL(req.url)
	const _id = url.searchParams.get('_id')
	if (await isAdmin()) {
		await MenuItem.deleteOne({ _id })
		return Response.json(true)
	} else {
		return Response.json(true)
	}
}
