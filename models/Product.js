const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      enum: [
        "butter",
        "cloud",
        "clear",
        "glossy",
        "crunchy",
        "foam",
        "jelly",
        "special",
      ],
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    inStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    features: [
      {
        type: String,
      },
    ],
    texture: String,
    scent: String,
    size: String,
    ingredients: [
      {
        type: String,
      },
    ],
    careInstructions: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Product", productSchema);
