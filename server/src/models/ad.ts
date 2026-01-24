import mongoose, { Document, Model } from "mongoose";

export type AdPlacement = "home" | "market" | "category";

export interface IAd extends Document {
  shopId: mongoose.Types.ObjectId | string;
  title?: string;
  description?: string;
  bannerImageUrl?: string;
  placement?: AdPlacement;
  marketName?: string;
  category?: string;
  budget?: number;
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const AdSchema = new mongoose.Schema<IAd>(
  {
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true, index: true },
    title: { type: String },
    description: { type: String },
    bannerImageUrl: { type: String },
    placement: { type: String, enum: ["home", "market", "category"] },
    marketName: { type: String, index: true },
    category: { type: String, index: true },
    budget: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// Indexes for common queries
AdSchema.index({ placement: 1 });
AdSchema.index({ marketName: 1 });
AdSchema.index({ category: 1 });

const Ad: Model<IAd> = (mongoose.models.Ad as Model<IAd>) || mongoose.model<IAd>("Ad", AdSchema);

export default Ad;
