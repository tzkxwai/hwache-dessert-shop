import type { Metadata } from "next";
import { OrderCheckout } from "@/components/OrderCheckout";
import { t } from "@/lib/strings";

export const metadata: Metadata = {
  title: t.titleOrder,
  description: t.orderLead,
};

export default function OrderPage() {
  return <OrderCheckout />;
}
