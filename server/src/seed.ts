import dotenv from "dotenv";
dotenv.config();

import connectDB from "./utils/db";
import ShopModel from "./models/shop";
import ProductModel from "./models/product";
import MarketModel from "./models/market";
import { mockMarkets, mockStores, mockProducts } from "./data/mockData";

async function run() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://localhost:27017/bazaario";
  await connectDB(uri);

  console.log("Seeding collections...");

  // Optional: clear existing collections
  await MarketModel.deleteMany({});
  await ShopModel.deleteMany({});
  await ProductModel.deleteMany({});

  // Insert mock markets
  const marketsToInsert = mockMarkets.map((m) => ({
    name: m.name,
    location: m.location,
    rating: m.rating,
    description: m.description,
    imageUrl: m.imageUrl,
    externalId: m.id,
  }));

  const createdMarkets = await MarketModel.insertMany(marketsToInsert);

  // Insert mock shops (match Shop schema)
  const shopsToInsert = mockStores.map((s) => {
    const market = createdMarkets.find((cm) => cm.externalId === s.marketId);
    return {
      shopName: s.name,
      description: s.description,
      profileImageUrl: s.imageUrl,
      phone: s.phone,
      marketName: market ? market.name : undefined,
      externalId: s.id,
    };
  });

  const createdShops = await ShopModel.insertMany(shopsToInsert);

  // Insert mock products (match Product schema)
  const productsToInsert = mockProducts.map((p) => {
    const shop = createdShops.find((cs) => cs.externalId === p.storeId);
    return {
      shopId: shop ? shop._id : undefined,
      name: p.name,
      description: p.description,
      images: p.images,
      price: p.price || 0,
      discountedPrice: p.discountedPrice,
      category: p.category,
      tags: p.tags,
      isAvailable: true,
      externalId: p.id,
    };
  });

  await ProductModel.insertMany(productsToInsert.filter((p) => p.shopId));

  console.log("Seeding complete.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
