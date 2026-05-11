"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/quantity-stepper";
import { CartItem as CartItemType, useCartStore } from "@/store/cart-store";
import { formatINR } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
}

export function CartItemCard({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 rounded-xl border border-border bg-white p-4 transition-all hover:shadow-sm">
      {/* Image */}
      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg sm:h-32 sm:w-28">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="112px"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-charcoal sm:text-base">
                {item.product.name}
              </h3>
              <p className="text-xs text-muted-foreground">{item.product.brand}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-red-500"
              onClick={() =>
                removeItem(item.product.id, item.size, item.color.name)
              }
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span>Size: <strong className="text-charcoal">{item.size}</strong></span>
            <span className="flex items-center gap-1">
              Color:
              <span
                className="inline-block h-3.5 w-3.5 rounded-full border border-gray-200"
                style={{ backgroundColor: item.color.hex }}
              />
              <strong className="text-charcoal">{item.color.name}</strong>
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <QuantityStepper
            quantity={item.quantity}
            onIncrease={() =>
              updateQuantity(
                item.product.id,
                item.size,
                item.color.name,
                item.quantity + 1
              )
            }
            onDecrease={() =>
              updateQuantity(
                item.product.id,
                item.size,
                item.color.name,
                item.quantity - 1
              )
            }
          />
          <div className="text-right">
            <p className="text-sm font-bold text-charcoal">
              {formatINR(item.product.price * item.quantity)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-muted-foreground">
                {formatINR(item.product.price)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
