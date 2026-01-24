import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { mockMarkets, getMarketById, getStoresByMarket, mockCategories, getProducts } from "@/lib/mockData";

// ============================================
// Markets
// ============================================
export function useMarkets() {
  return useQuery({
    queryKey: [api.markets.list.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.markets.list.path, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch markets");
        return api.markets.list.responses[200].parse(await res.json());
      } catch (err) {
        // fallback to mock data
        return mockMarkets;
      }
    },
  });
}

export function useMarket(id: number) {
  return useQuery({
    queryKey: [api.markets.get.path, id],
    queryFn: async () => {
      try {
        const url = buildUrl(api.markets.get.path, { id });
        const res = await fetch(url, { credentials: "include" });
        if (res.status === 404) return null;
        if (!res.ok) throw new Error("Failed to fetch market");
        return api.markets.get.responses[200].parse(await res.json());
      } catch (err) {
        return getMarketById(String(id));
      }
    },
    enabled: !!id,
  });
}

// ============================================
// Stores
// ============================================
export function useStores(marketId?: string) {
  return useQuery({
    queryKey: [api.stores.list.path, marketId],
    queryFn: async () => {
      try {
        const url = marketId 
          ? `${api.stores.list.path}?marketId=${marketId}`
          : api.stores.list.path;
        const res = await fetch(url, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch stores");
        return api.stores.list.responses[200].parse(await res.json());
      } catch (err) {
        return getStoresByMarket(marketId);
      }
    },
  });
}

export function useStore(id: number) {
  return useQuery({
    queryKey: [api.stores.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.stores.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch store");
      return api.stores.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// ============================================
// Categories
// ============================================
export function useCategories() {
  return useQuery({
    queryKey: [api.categories.list.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.categories.list.path, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch categories");
        return api.categories.list.responses[200].parse(await res.json());
      } catch (err) {
        return mockCategories;
      }
    },
  });
}

// ============================================
// Products
// ============================================
export function useProducts(params?: { storeId?: string; categoryId?: string; search?: string }) {
  return useQuery({
    queryKey: [api.products.list.path, params],
    queryFn: async () => {
      try {
        let url = api.products.list.path;
        if (params) {
          const queryParams = new URLSearchParams();
          if (params.storeId) queryParams.append("storeId", params.storeId);
          if (params.categoryId) queryParams.append("categoryId", params.categoryId);
          if (params.search) queryParams.append("search", params.search);
          url += `?${queryParams.toString()}`;
        }
        
        const res = await fetch(url, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch products");
        return api.products.list.responses[200].parse(await res.json());
      } catch (err) {
        return getProducts({ storeId: params?.storeId, category: params?.categoryId });
      }
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      return api.products.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// ============================================
// Cart
// ============================================
export function useCart() {
  return useQuery({
    queryKey: [api.cart.list.path],
    queryFn: async () => {
      const res = await fetch(api.cart.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch cart");
      return api.cart.list.responses[200].parse(await res.json());
    },
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { productId: number; quantity: number }) => {
      const validated = api.cart.add.input.parse(data);
      const res = await fetch(api.cart.add.path, {
        method: api.cart.add.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      return api.cart.add.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.cart.list.path] }),
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const validated = api.cart.update.input.parse({ quantity });
      const url = buildUrl(api.cart.update.path, { id });
      const res = await fetch(url, {
        method: api.cart.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update cart");
      return api.cart.update.responses[200].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.cart.list.path] }),
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.cart.remove.path, { id });
      const res = await fetch(url, {
        method: api.cart.remove.method,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to remove item");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.cart.list.path] }),
  });
}
