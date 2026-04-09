import { t } from "./strings";

export type MenuRow = { id: string; name: string; desc: string; price: number };

export const popularProducts: (MenuRow & { emoji: string })[] = [
  { id: "popular-1", emoji: "🍰", name: t.dish1Name, desc: t.dish1Desc, price: 189 },
  { id: "popular-2", emoji: "🥭", name: t.dish2Name, desc: t.dish2Desc, price: 95 },
  { id: "popular-3", emoji: "🍡", name: t.dish3Name, desc: t.dish3Desc, price: 220 },
  { id: "popular-4", emoji: "🍨", name: t.dish4Name, desc: t.dish4Desc, price: 129 },
];

export const firmDrinks: MenuRow[] = [
  { id: "firm-1", name: t.firm1n, desc: t.firm1d, price: 139 },
  { id: "firm-2", name: t.firm2n, desc: t.firm2d, price: 149 },
  { id: "firm-3", name: t.firm3n, desc: t.firm3d, price: 129 },
  { id: "firm-4", name: t.firm4n, desc: t.firm4d, price: 119 },
];

export const snacks: MenuRow[] = [
  { id: "snack-1", name: t.snack1n, desc: t.snack1d, price: 159 },
  { id: "snack-2", name: t.snack2n, desc: t.snack2d, price: 139 },
  { id: "snack-3", name: t.snack3n, desc: t.snack3d, price: 95 },
  { id: "snack-4", name: t.snack4n, desc: t.snack4d, price: 299 },
];

export const specials: MenuRow[] = [
  { id: "spec-1", name: t.spec1n, desc: t.spec1d, price: 279 },
  { id: "spec-2", name: t.spec2n, desc: t.spec2d, price: 189 },
];

export const hwFruit: MenuRow[] = [
  { id: "hwa-fruit-1", name: t.hwaF1n, desc: t.hwaF1d, price: 109 },
  { id: "hwa-fruit-2", name: t.hwaF2n, desc: t.hwaF2d, price: 119 },
  { id: "hwa-fruit-3", name: t.hwaF3n, desc: t.hwaF3d, price: 129 },
];

export const hwCream: MenuRow[] = [
  { id: "hwa-cream-1", name: t.hwaC1n, desc: t.hwaC1d, price: 119 },
  { id: "hwa-cream-2", name: t.hwaC2n, desc: t.hwaC2d, price: 109 },
  { id: "hwa-cream-3", name: t.hwaC3n, desc: t.hwaC3d, price: 129 },
];

export const hwSpark: MenuRow[] = [
  { id: "hwa-spark-1", name: t.hwaS1n, desc: t.hwaS1d, price: 99 },
  { id: "hwa-spark-2", name: t.hwaS2n, desc: t.hwaS2d, price: 109 },
  { id: "hwa-spark-3", name: t.hwaS3n, desc: t.hwaS3d, price: 119 },
];

export const hwAuth: MenuRow[] = [
  { id: "hwa-auth-1", name: t.hwaA1n, desc: t.hwaA1d, price: 119 },
  { id: "hwa-auth-2", name: t.hwaA2n, desc: t.hwaA2d, price: 149 },
];
