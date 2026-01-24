export const mockMarkets = [
  {
    id: "1",
    name: "Sarojini Nagar",
    location: "South Delhi",
    rating: 4.6,
    description: "One of Delhi's most loved markets for budget fashion and fabrics.",
    imageUrl: "/images/market-1.svg",
  },
  {
    id: "2",
    name: "Dilli Haat",
    location: "INA, New Delhi",
    rating: 4.8,
    description: "Curated marketplace for crafts and regional cuisine.",
    imageUrl: "/images/market-2.svg",
  },
];

export const mockStores = [
  {
    id: "s1",
    marketId: "1",
    name: "Ramesh Textiles",
    description: "Fabrics, sarees and tailoring services.",
    imageUrl: "/images/shop-1.svg",
    phone: "+91 98100 12345",
  },
  {
    id: "s2",
    marketId: "2",
    name: "Crafts Corner",
    description: "Handmade home decor and gifts.",
    imageUrl: "/images/shop-1.svg",
    phone: "+91 98765 43210",
  },
];

export const mockProducts = [
  {
    id: "p1",
    storeId: "s1",
    name: "Handloom Saree",
    description: "Pure handloom saree, 100% cotton.",
    images: ["/images/product-1.svg"],
    price: 1200,
    discountedPrice: 999,
    category: "Apparel",
    tags: ["saree", "handloom"],
  },
  {
    id: "p2",
    storeId: "s2",
    name: "Brass Earrings",
    description: "Lightweight brass jewelry.",
    images: ["/images/product-1.svg"],
    price: 450,
    category: "Jewelry",
    tags: ["jewelry", "brass"],
  },
];

export const mockCategories = [
  { id: "c1", name: "Apparel" },
  { id: "c2", name: "Jewelry" },
  { id: "c3", name: "Footwear" },
];

export function getMarketById(id: string) {
  return mockMarkets.find((m) => m.id === id) || null;
}

export function getStoresByMarket(marketId?: string) {
  if (!marketId) return mockStores;
  return mockStores.filter((s) => s.marketId === marketId);
}

export function getProducts(params?: { storeId?: string; category?: string }) {
  let res = mockProducts;
  if (params?.storeId) res = res.filter((p) => p.storeId === params.storeId);
  if (params?.category) res = res.filter((p) => p.category === params.category);
  return res;
}
