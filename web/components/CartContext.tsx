"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "hwache_cart_v1";

export type CartLine = { id: string; name: string; price: number; qty: number };

type CartContextValue = {
  lines: CartLine[];
  addItem: (id: string, name: string, price: number) => void;
  setQtyDelta: (index: number, delta: number) => void;
  removeLine: (index: number) => void;
  clear: () => void;
  total: number;
  count: number;
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setLines(raw ? (JSON.parse(raw) as CartLine[]) : []);
    } catch {
      setLines([]);
    }
    setHydrated(true);
  }, []);

  const addItem = useCallback(
    (id: string, name: string, price: number) => {
      setLines((prev) => {
        const i = prev.findIndex((l) => l.id === id);
        const next =
          i >= 0
            ? prev.map((l, j) => (j === i ? { ...l, qty: l.qty + 1 } : l))
            : [...prev, { id, name, price, qty: 1 }];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const setQtyDelta = useCallback((index: number, delta: number) => {
    setLines((prev) => {
      const line = prev[index];
      if (!line) return prev;
      const qty = line.qty + delta;
      let next: CartLine[];
      if (qty <= 0) {
        next = prev.filter((_, j) => j !== index);
      } else {
        next = prev.map((l, j) => (j === index ? { ...l, qty } : l));
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeLine = useCallback((index: number) => {
    setLines((prev) => {
      const next = prev.filter((_, j) => j !== index);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "[]");
    setLines([]);
  }, []);

  const total = useMemo(
    () => lines.reduce((s, l) => s + l.price * l.qty, 0),
    [lines]
  );
  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);

  const value = useMemo(
    () => ({
      lines,
      addItem,
      setQtyDelta,
      removeLine,
      clear,
      total,
      count,
      hydrated,
    }),
    [lines, addItem, setQtyDelta, removeLine, clear, total, count, hydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
