import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email"),
  phone: text("phone"),
  role: text("role", { enum: ["customer", "seller"] }).default("customer").notNull(),
  avatarUrl: text("avatar_url"),
  isSeller: boolean("is_seller").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const markets = pgTable("markets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // e.g., "Sarojini Nagar"
  description: text("description").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: text("rating").default("4.5"),
});

export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  marketId: integer("market_id").references(() => markets.id).notNull(),
  name: text("name").notNull(),
  ownerId: integer("owner_id").references(() => users.id), // Optional for seed data
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  isVideoEnabled: boolean("is_video_enabled").default(true),
  isOpen: boolean("is_open").default(true),
  rating: text("rating").default("4.8"),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // Suits, Bags, Watches
  icon: text("icon").notNull(), // Lucide icon name
  imageUrl: text("image_url"),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  storeId: integer("store_id").references(() => stores.id).notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // In Rupees
  originalPrice: integer("original_price"), // For strikethrough
  imageUrl: text("image_url").notNull(),
  inStock: boolean("in_stock").default(true),
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(), // For simplicity in MVP
  productId: integer("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").default(1).notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  total: integer("total").notNull(),
  status: text("status", { enum: ["pending", "confirmed", "shipped", "delivered"] }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const marketsRelations = relations(markets, ({ many }) => ({
  stores: many(stores),
}));

export const storesRelations = relations(stores, ({ one, many }) => ({
  market: one(markets, {
    fields: [stores.marketId],
    references: [markets.id],
  }),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  store: one(stores, {
    fields: [products.storeId],
    references: [stores.id],
  }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

// Schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertMarketSchema = createInsertSchema(markets).omit({ id: true });
export const insertStoreSchema = createInsertSchema(stores).omit({ id: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Market = typeof markets.$inferSelect;
export type Store = typeof stores.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
export type Order = typeof orders.$inferSelect;
