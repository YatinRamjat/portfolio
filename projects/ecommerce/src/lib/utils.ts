import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateOrderId(): string {
  const random = Math.floor(10000 + Math.random() * 90000);
  return `#TW-2024-${random}`;
}

export function calculateDiscount(price: number, mrp: number): number {
  return Math.round(((mrp - price) / mrp) * 100);
}

export function calculateCGST(subtotal: number): number {
  return Math.round(subtotal * 0.09);
}

export function calculateSGST(subtotal: number): number {
  return Math.round(subtotal * 0.09);
}

export function getDeliveryCharge(subtotal: number): number {
  return subtotal >= 999 ? 0 : 79;
}

export function getEstimatedDelivery(): string {
  const start = new Date();
  start.setDate(start.getDate() + 5);
  const end = new Date();
  end.setDate(end.getDate() + 7);
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${start.toLocaleDateString("en-IN", options)} - ${end.toLocaleDateString("en-IN", options)}`;
}
