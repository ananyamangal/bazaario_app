import mongoose, { Document, Model } from "mongoose";

export type OrderStatus = "created" | "confirmed" | "completed" | "cancelled";

export interface IOrderProduct {
  productId: mongoose.Types.ObjectId | string;
  quantity: number;
  price: number; // price at time of order
}

export interface IPayment {
  method?: string; // e.g., razorpay, cod, card
  status?: string; // e.g., pending, paid, failed
  transactionId?: string;
}

export interface IDeliveryAddress {
  city?: string;
  state?: string;
  pincode?: string;
  addressLine?: string;
  coordinates?: number[]; // [lng, lat]
}

export interface IDelivery {
  type?: "pickup" | "delivery";
  address?: IDeliveryAddress;
  status?: string; // e.g., pending, out-for-delivery, delivered
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId | string;
  shopId: mongoose.Types.ObjectId | string;
  products: IOrderProduct[];
  totalAmount: number;
  payment?: IPayment;
  delivery?: IDelivery;
  orderStatus?: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderProductSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const DeliveryAddressSchema = new mongoose.Schema(
  {
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    addressLine: { type: String },
    coordinates: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number] },
    },
  },
  { _id: false }
);

const DeliverySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["pickup", "delivery"], default: "delivery" },
    address: { type: DeliveryAddressSchema, default: {} },
    status: { type: String },
  },
  { _id: false }
);

const PaymentSchema = new mongoose.Schema(
  {
    method: { type: String },
    status: { type: String },
    transactionId: { type: String },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true, index: true },
    products: { type: [OrderProductSchema], required: true },
    totalAmount: { type: Number, required: true },
    payment: { type: PaymentSchema, default: {} },
    delivery: { type: DeliverySchema, default: {} },
    orderStatus: {
      type: String,
      enum: ["created", "confirmed", "completed", "cancelled"],
      default: "created",
    },
  },
  { timestamps: true }
);

// Indexes
OrderSchema.index({ userId: 1 });
OrderSchema.index({ shopId: 1 });

const Order: Model<IOrder> = (mongoose.models.Order as Model<IOrder>) || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
