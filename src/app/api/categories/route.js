import { connectToDb } from '@/lib/utils'
import { Category } from '@/models/Category'
import { isAdmin } from '../auth/[...nextauth]/route'

export async function POST(req) {
	connectToDb()
	const { name } = await req.json()
	if (await isAdmin()) {
		const categoryDoc = await Category.create({ name })
		return Response.json(categoryDoc)
	} else {
		return Response.json({})
	}
}

export async function PUT(req) {
	connectToDb()
	const { _id, name } = await req.json()
	if (await isAdmin()) {
		await Category.updateOne({ _id }, { name })
	}
	return Response.json(true)
}

export async function GET() {
	connectToDb()
	return Response.json(await Category.find())
}

export async function DELETE(req) {
	connectToDb()
	const url = new URL(req.url)
	const _id = url.searchParams.get('_id')
	if (await isAdmin()) {
		await Category.deleteOne({ _id })
	}
	return Response.json(true)
}
