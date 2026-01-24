import mongoose, { Document, Model } from "mongoose";

export interface IProduct extends Document {
  shopId: mongoose.Types.ObjectId | string;
  name: string;
  description?: string;
  images?: string[];
  price: number;
  discountedPrice?: number;
  category?: string;
  tags?: string[];
  isAvailable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    images: { type: [String], default: [] },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    category: { type: String, index: true },
    tags: { type: [String], default: [] },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Additional indexes (compound) can help queries by shop+category
ProductSchema.index({ shopId: 1, category: 1 });

const Product: Model<IProduct> = (mongoose.models.Product as Model<IProduct>) || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
