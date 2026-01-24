import mongoose, { Document, Model } from "mongoose";

// Location sub-document interface
export interface ILocation {
  city?: string;
  state?: string;
  pincode?: string;
  // GeoJSON Point [lng, lat]
  coordinates?: number[];
}

export interface IUser extends Document {
  name?: string;
  phone: string;
  email?: string;
  role: string;
  location?: ILocation & { type?: string };
  isVerified: boolean;
  isBlocked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const LocationSchema = new mongoose.Schema(
  {
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    // Use GeoJSON Point for coordinates (stored as [lng, lat])
    coordinates: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number] },
    },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, trim: true },
    phone: { type: String, required: true, unique: true, index: true },
    email: { type: String, lowercase: true, trim: true },
    role: { type: String, default: "customer" },
    location: { type: LocationSchema, default: {} },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create 2dsphere index if coordinates are used
UserSchema.index({ "location.coordinates": "2dsphere" });

const User: Model<IUser> = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);

export default User;
