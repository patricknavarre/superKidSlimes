const mongoose = require("mongoose");
const Category = require("../models/Category");

const initialCategories = [
  {
    name: "Butter",
    displayOrder: 1,
  },
  {
    name: "Clear",
    displayOrder: 2,
  },
  {
    name: "Cloud",
    displayOrder: 3,
  },
  {
    name: "Glossy",
    displayOrder: 4,
  },
];

async function createCategories() {
  try {
    await mongoose.connect("mongodb://localhost:27017/slime-shop", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing categories
    await Category.deleteMany({});
    console.log("Cleared existing categories");

    // Create new categories
    const categories = await Category.create(initialCategories);
    console.log("Created categories:", categories);

    mongoose.connection.close();
    console.log("Done!");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

createCategories();
