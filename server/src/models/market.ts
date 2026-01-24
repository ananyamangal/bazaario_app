import mongoose, { Document, Model } from "mongoose";

export interface IMarket extends Document {
  name: string;
  location?: string;
  rating?: number;
  description?: string;
  imageUrl?: string;
  externalId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const MarketSchema = new mongoose.Schema<IMarket>(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String },
    rating: { type: Number, default: 0 },
    description: { type: String },
    imageUrl: { type: String },
    externalId: { type: String, index: true },
  },
  { timestamps: true }
);

const Market: Model<IMarket> = (mongoose.models.Market as Model<IMarket>) || mongoose.model<IMarket>("Market", MarketSchema);

export default Market;
