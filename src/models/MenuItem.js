import mongoose, { Schema, model, models } from 'mongoose'

const ExtraPriceSchema = new Schema({
	name: {
		type: String,
	},
	price: {
		type: Number,
	},
})

const MenuItemSchema = new Schema(
	{
		image: { type: String },
		name: { type: String },
		description: { type: String },
		category: { type: mongoose.Types.ObjectId },
		basePrice: { type: Number },
		sizes: { type: [ExtraPriceSchema] },
		extraIngridientPrices: { type: [ExtraPriceSchema] },
	},
	{ timestamps: true }
)

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema)
