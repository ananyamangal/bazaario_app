import mongoose, { Document, Model } from "mongoose";

export type RTCProvider = "agora" | "twilio";
export type VideoStatus = "requested" | "accepted" | "ongoing" | "ended" | "cancelled";

export interface IVideoSession extends Document {
  userId: mongoose.Types.ObjectId | string;
  shopId: mongoose.Types.ObjectId | string;
  shopUserId?: mongoose.Types.ObjectId | string;
  status: VideoStatus;
  startTime?: Date;
  endTime?: Date;
  durationSeconds?: number;
  rtcProvider?: RTCProvider;
  rtcSessionId?: string;
  endedReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const VideoSessionSchema = new mongoose.Schema<IVideoSession>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true, index: true },
    shopUserId: { type: mongoose.Schema.Types.ObjectId, ref: "ShopUser" },
    status: {
      type: String,
      enum: ["requested", "accepted", "ongoing", "ended", "cancelled"],
      default: "requested",
      index: true,
    },
    startTime: { type: Date },
    endTime: { type: Date },
    durationSeconds: { type: Number },
    rtcProvider: { type: String, enum: ["agora", "twilio"] },
    rtcSessionId: { type: String },
    endedReason: { type: String },
  },
  { timestamps: true }
);

// Indexes
VideoSessionSchema.index({ shopId: 1 });
VideoSessionSchema.index({ userId: 1 });
VideoSessionSchema.index({ status: 1 });

const VideoSession: Model<IVideoSession> = (mongoose.models.VideoSession as Model<IVideoSession>) || mongoose.model<IVideoSession>("VideoSession", VideoSessionSchema);

export default VideoSession;
