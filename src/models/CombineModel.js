import mongoose from "mongoose";

const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const CombineModelSchema = Schema(
  {
    userId: { type: ObjectId, required: true },
    clothesIds: { type: [ObjectId], required: true },
  },
  { timestamps: true }
);

const CombineModel = mongoose.model("Combine", CombineModelSchema);

export default CombineModel;
