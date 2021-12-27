import mongoose from "mongoose";

const { Schema } = mongoose;

const ClothesConstants = {
  categories: ["accessory", "bag", "bottom", "shoes", "top"],
  moods: ["chic", "daily", "feeling-lucky", "office", "party", "sports"],
  weatherTypes: ["cold", "hot"],
};

const ClothesSchema = Schema(
  {
    category: {
      type: String,
      enum: ClothesConstants.categories,
      required: true,
    },
    imageUrl: String,
    mood: {
      type: String,
      enum: [...ClothesConstants.moods, null],
      default: null,
    },
    name: { type: String, required: true },
    weatherType: {
      type: String,
      enum: [...ClothesConstants.weatherTypes, null],
      default: null,
    },
  },
  { timestamps: true }
);

const ClothesModel = mongoose.model("Clothes", ClothesSchema);

export { ClothesConstants };
export default ClothesModel;
