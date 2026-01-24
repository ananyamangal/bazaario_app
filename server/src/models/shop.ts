import mongoose, { Document, Model } from "mongoose";

export interface IAddress {
  city?: string;
  state?: string;
  pincode?: string;
  // GeoJSON Point [lng, lat]
  coordinates?: number[];
}

export interface ISubscription {
  plan?: string;
  price?: number;
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
}

export interface IShop extends Document {
  shopName: string;
  ownerName?: string;
  phone?: string;
  category?: string[];
  marketName?: string;
  description?: string;
  profileImageUrl?: string;
  bannerImageUrl?: string;
  galleryImages?: string[];
  address?: IAddress & { type?: string };
  subscription?: ISubscription;
  rating?: number;
  totalOrders?: number;
  isVerified?: boolean;
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const AddressSchema = new mongoose.Schema(
  {
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    coordinates: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number] },
    },
  },
  { _id: false }
);

const SubscriptionSchema = new mongoose.Schema(
  {
    plan: { type: String },
    price: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: false },
  },
  { _id: false }
);

const ShopSchema = new mongoose.Schema<IShop>(
  {
    shopName: { type: String, required: true, trim: true },
    ownerName: { type: String },
    phone: { type: String, index: true },
    category: { type: [String], index: true },
    marketName: { type: String, index: true },
    description: { type: String },
    profileImageUrl: { type: String },
    bannerImageUrl: { type: String },
    galleryImages: { type: [String], default: [] },
    address: { type: AddressSchema, default: {} },
    subscription: { type: SubscriptionSchema, default: {} },
    rating: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// 2dsphere index for geo queries
ShopSchema.index({ "address.coordinates": "2dsphere" });

const Shop: Model<IShop> = (mongoose.models.Shop as Model<IShop>) || mongoose.model<IShop>("Shop", ShopSchema);

export default Shop;
