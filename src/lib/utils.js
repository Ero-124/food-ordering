import mongoose from 'mongoose'

export const connectToDb = async () => {
	try {
		const mongoURI = process.env.MONGO_URL
		if (!mongoURI) {
			throw new Error('MongoDB connection string is not provided')
		}

		await mongoose.connect(mongoURI)

		console.log('Connected to the database')
	} catch (error) {
		console.error('Error connecting to the database:', error)
		throw new Error('Failed to connect to the database')
	}
}
