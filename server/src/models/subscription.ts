import mongoose, { Document, Model } from "mongoose";

export type BillingCycle = "monthly" | "yearly";
export type PaymentStatus = "paid" | "pending";

export interface ISubscription extends Document {
  shopId: mongoose.Types.ObjectId | string;
  planName?: string;
  price?: number;
  billingCycle?: BillingCycle;
  startDate?: Date;
  endDate?: Date;
  paymentStatus?: PaymentStatus;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const SubscriptionSchema = new mongoose.Schema<ISubscription>(
  {
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true, index: true },
    planName: { type: String },
    price: { type: Number },
    billingCycle: { type: String, enum: ["monthly", "yearly"], default: "monthly" },
    startDate: { type: Date },
    endDate: { type: Date },
    paymentStatus: { type: String, enum: ["paid", "pending"], default: "pending" },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

SubscriptionSchema.index({ shopId: 1 });
SubscriptionSchema.index({ isActive: 1 });

const Subscription: Model<ISubscription> = (mongoose.models.Subscription as Model<ISubscription>) || mongoose.model<ISubscription>("Subscription", SubscriptionSchema);

export default Subscription;
