import { db } from "./db";
import {
  users, markets, stores, products, categories, cartItems,
  type User, type InsertUser,
  type Market, type Store, type Product, type Category, type CartItem
} from "@shared/schema";
import { eq, like, or } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Markets
  getMarkets(): Promise<Market[]>;
  getMarket(id: number): Promise<Market | undefined>;

  // Stores
  getStores(marketId?: number): Promise<Store[]>;
  getStore(id: number): Promise<Store | undefined>;

  // Products
  getProducts(filters?: { storeId?: number; categoryId?: number; search?: string }): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;

  // Categories
  getCategories(): Promise<Category[]>;

  // Cart
  getCartItems(userId: number): Promise<(CartItem & { product: Product })[]>;
  addToCart(userId: number, productId: number, quantity: number): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Markets
  async getMarkets(): Promise<Market[]> {
    return await db.select().from(markets);
  }

  async getMarket(id: number): Promise<Market | undefined> {
    const [market] = await db.select().from(markets).where(eq(markets.id, id));
    return market;
  }

  // Stores
  async getStores(marketId?: number): Promise<Store[]> {
    if (marketId) {
      return await db.select().from(stores).where(eq(stores.marketId, marketId));
    }
    return await db.select().from(stores);
  }

  async getStore(id: number): Promise<Store | undefined> {
    const [store] = await db.select().from(stores).where(eq(stores.id, id));
    return store;
  }

  // Products
  async getProducts(filters?: { storeId?: number; categoryId?: number; search?: string }): Promise<Product[]> {
    let query = db.select().from(products);
    
    // Build query conditions
    const conditions = [];
    if (filters?.storeId) conditions.push(eq(products.storeId, filters.storeId));
    if (filters?.categoryId) conditions.push(eq(products.categoryId, filters.categoryId));
    if (filters?.search) {
      conditions.push(
        or(
          like(products.name, `%${filters.search}%`),
          like(products.description, `%${filters.search}%`)
        )
      );
    }

    if (conditions.length > 0) {
      // @ts-ignore - simple 'and' construction
      return await query.where((...args) => conditions.reduce((acc, curr) => db.and(acc, curr) as any));
    }

    return await query;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  // Cart
  async getCartItems(userId: number): Promise<(CartItem & { product: Product })[]> {
    return await db
      .select({
        id: cartItems.id,
        userId: cartItems.userId,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        product: products,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, userId));
  }

  async addToCart(userId: number, productId: number, quantity: number): Promise<CartItem> {
    // Check if item exists
    const [existing] = await db
      .select()
      .from(cartItems)
      .where(
        // @ts-ignore
        db.and(eq(cartItems.userId, userId), eq(cartItems.productId, productId))
      );

    if (existing) {
      const [updated] = await db
        .update(cartItems)
        .set({ quantity: existing.quantity + quantity })
        .where(eq(cartItems.id, existing.id))
        .returning();
      return updated;
    }

    const [item] = await db
      .insert(cartItems)
      .values({ userId, productId, quantity })
      .returning();
    return item;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const [item] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return item;
  }

  async removeFromCart(id: number): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }
}

export const storage = new DatabaseStorage();
