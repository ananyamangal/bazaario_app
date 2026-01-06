import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth } from "./auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Auth setup (if enabled later, for now we can rely on basic seed or optional Replit auth)
  // setupAuth(app); // Commented out until auth integration is fully active if needed, or we can enable it.
  
  // Markets
  app.get(api.markets.list.path, async (req, res) => {
    const markets = await storage.getMarkets();
    res.json(markets);
  });

  app.get(api.markets.get.path, async (req, res) => {
    const market = await storage.getMarket(Number(req.params.id));
    if (!market) return res.status(404).json({ message: "Market not found" });
    res.json(market);
  });

  // Stores
  app.get(api.stores.list.path, async (req, res) => {
    const marketId = req.query.marketId ? Number(req.query.marketId) : undefined;
    const stores = await storage.getStores(marketId);
    res.json(stores);
  });

  app.get(api.stores.get.path, async (req, res) => {
    const store = await storage.getStore(Number(req.params.id));
    if (!store) return res.status(404).json({ message: "Store not found" });
    res.json(store);
  });

  // Products
  app.get(api.products.list.path, async (req, res) => {
    const filters = {
      storeId: req.query.storeId ? Number(req.query.storeId) : undefined,
      categoryId: req.query.categoryId ? Number(req.query.categoryId) : undefined,
      search: req.query.search as string | undefined,
    };
    const products = await storage.getProducts(filters);
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  // Categories
  app.get(api.categories.list.path, async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  // Cart - MOCKED USER ID for MVP (User ID 1)
  const MOCK_USER_ID = 1;

  app.get(api.cart.list.path, async (req, res) => {
    const items = await storage.getCartItems(MOCK_USER_ID);
    res.json(items);
  });

  app.post(api.cart.add.path, async (req, res) => {
    try {
      const input = api.cart.add.input.parse(req.body);
      const item = await storage.addToCart(MOCK_USER_ID, input.productId, input.quantity);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.patch(api.cart.update.path, async (req, res) => {
    const input = api.cart.update.input.parse(req.body);
    const item = await storage.updateCartItem(Number(req.params.id), input.quantity);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  });

  app.delete(api.cart.remove.path, async (req, res) => {
    await storage.removeFromCart(Number(req.params.id));
    res.status(204).send();
  });

  return httpServer;
}

// Seed Data
async function seed() {
  const existingMarkets = await storage.getMarkets();
  if (existingMarkets.length === 0) {
    // Create Mock User
    await storage.createUser({ 
      username: "demo_user", 
      email: "demo@bazaario.in", 
      phone: "9876543210", 
      role: "customer" 
    });

    // Markets
    const m1 = await db.insert(schema.markets).values({
      name: "Sarojini Nagar",
      location: "South Delhi",
      description: "Famous for export surplus clothing and bargaining.",
      imageUrl: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80",
    }).returning();

    const m2 = await db.insert(schema.markets).values({
      name: "Lajpat Nagar",
      location: "South Delhi",
      description: "Known for traditional wear, fabric, and street food.",
      imageUrl: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&q=80",
    }).returning();

    // Categories
    const c1 = await db.insert(schema.categories).values({ name: "Suits", icon: "Shirt" }).returning();
    const c2 = await db.insert(schema.categories).values({ name: "Bags", icon: "ShoppingBag" }).returning();
    const c3 = await db.insert(schema.categories).values({ name: "Watches", icon: "Watch" }).returning();

    // Stores
    const s1 = await db.insert(schema.stores).values({
      marketId: m1[0].id,
      name: "Fashion Hub",
      imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80",
      description: "Export surplus tops and jeans",
    }).returning();

    const s2 = await db.insert(schema.stores).values({
      marketId: m2[0].id,
      name: "Ethnic Elegance",
      imageUrl: "https://images.unsplash.com/photo-1566814392476-d62198083c65?auto=format&fit=crop&q=80",
      description: "Best Lehengas and Suits",
    }).returning();

    // Products
    await db.insert(schema.products).values([
      {
        storeId: s1[0].id,
        categoryId: c1[0].id,
        name: "Floral Summer Dress",
        description: "Cotton floral dress, perfect for summer.",
        price: 450,
        originalPrice: 1200,
        imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80",
      },
      {
        storeId: s1[0].id,
        categoryId: c2[0].id,
        name: "Leather Tote Bag",
        description: "Genuine leather tote bag in tan.",
        price: 850,
        originalPrice: 2500,
        imageUrl: "https://images.unsplash.com/photo-1590874103328-360702279e04?auto=format&fit=crop&q=80",
      },
      {
        storeId: s2[0].id,
        categoryId: c1[0].id,
        name: "Embroidered Anarkali",
        description: "Heavy embroidery anarkali suit set.",
        price: 2500,
        originalPrice: 4500,
        imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80",
      },
    ]);
  }
}

import { db } from "./db";
import * as schema from "@shared/schema";

// Run seed on startup (in a real app, use a migration script)
seed().catch(console.error);
