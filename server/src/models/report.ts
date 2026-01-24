import mongoose, { Document, Model } from "mongoose";

export type EntityType = "user" | "shop";
export type ReportStatus = "open" | "reviewed" | "action_taken";

export interface IReport extends Document {
  reportedBy: mongoose.Types.ObjectId | string;
  reportedAgainst?: mongoose.Types.ObjectId | string;
  entityType: EntityType;
  reportedAgainstModel?: string; // internal model name for refPath (User|Shop)
  videoSessionId?: mongoose.Types.ObjectId | string;
  reason?: string;
  description?: string;
  status?: ReportStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

const ReportSchema = new mongoose.Schema<IReport>(
  {
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    // Use refPath to allow referencing either User or Shop dynamically
    reportedAgainst: { type: mongoose.Schema.Types.ObjectId, refPath: "reportedAgainstModel" },
    // entityType stores the logical type (user|shop) as requested
    entityType: { type: String, enum: ["user", "shop"], required: true, index: true },
    // internal field used by refPath — will be auto-set from entityType in pre-validate
    reportedAgainstModel: { type: String, enum: ["User", "Shop"] },
    videoSessionId: { type: mongoose.Schema.Types.ObjectId, ref: "VideoSession" },
    reason: { type: String },
    description: { type: String },
    status: { type: String, enum: ["open", "reviewed", "action_taken"], default: "open", index: true },
  },
  { timestamps: true }
);

// Before validation, set reportedAgainstModel based on entityType when missing
ReportSchema.pre("validate", function (next) {
  const doc: any = this;
  if (!doc.reportedAgainstModel && doc.entityType) {
    if (doc.entityType === "user") doc.reportedAgainstModel = "User";
    else if (doc.entityType === "shop") doc.reportedAgainstModel = "Shop";
  }
  next();
});

// Indexes
ReportSchema.index({ status: 1 });
ReportSchema.index({ entityType: 1 });

const Report: Model<IReport> = (mongoose.models.Report as Model<IReport>) || mongoose.model<IReport>("Report", ReportSchema);

export default Report;
