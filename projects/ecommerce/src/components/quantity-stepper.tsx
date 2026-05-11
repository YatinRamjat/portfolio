"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

export function QuantityStepper({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 10,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center rounded-lg border border-border">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-r-none"
        onClick={onDecrease}
        disabled={quantity <= min}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="flex h-8 w-10 items-center justify-center text-sm font-medium">
        {quantity}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-l-none"
        onClick={onIncrease}
        disabled={quantity >= max}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
