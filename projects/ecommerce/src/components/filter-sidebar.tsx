"use client";

import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/lib/data";
import { formatINR } from "@/lib/utils";
import { Star } from "lucide-react";

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  rating: number | null;
  gender: string | null;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "Free Size"];
const colorOptions = [
  { name: "Red", hex: "#DC143C" },
  { name: "Blue", hex: "#000080" },
  { name: "Green", hex: "#228B22" },
  { name: "Yellow", hex: "#FFD700" },
  { name: "Pink", hex: "#FF69B4" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
  { name: "Orange", hex: "#FF8C00" },
  { name: "Cream", hex: "#FFFDD0" },
  { name: "Grey", hex: "#808080" },
];

function FilterContent({ filters, onFilterChange }: FilterSidebarProps) {
  const updateFilter = (key: keyof FilterState, value: unknown) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleCategory = (slug: string) => {
    const updated = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];
    updateFilter("categories", updated);
  };

  const toggleSize = (size: string) => {
    const updated = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    updateFilter("sizes", updated);
  };

  const toggleColor = (color: string) => {
    const updated = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    updateFilter("colors", updated);
  };

  return (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-charcoal">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.slug} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat.slug}`}
                checked={filters.categories.includes(cat.slug)}
                onCheckedChange={() => toggleCategory(cat.slug)}
              />
              <Label htmlFor={`cat-${cat.slug}`} className="text-sm cursor-pointer">
                {cat.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-charcoal">Price Range</h3>
        <Slider
          min={299}
          max={9999}
          step={100}
          value={filters.priceRange}
          onValueChange={(v) => updateFilter("priceRange", v as [number, number])}
          className="mt-2"
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{formatINR(filters.priceRange[0])}</span>
          <span>{formatINR(filters.priceRange[1])}</span>
        </div>
      </div>

      <Separator />

      {/* Size */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-charcoal">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                filters.sizes.includes(size)
                  ? "border-saffron bg-saffron text-white"
                  : "border-border bg-white text-charcoal hover:border-saffron"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Color */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-charcoal">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`h-8 w-8 rounded-full border-2 transition-all ${
                filters.colors.includes(color.name)
                  ? "border-saffron scale-110 ring-2 ring-saffron/30"
                  : "border-gray-200 hover:scale-105"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-charcoal">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() =>
                updateFilter("rating", filters.rating === rating ? null : rating)
              }
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-all ${
                filters.rating === rating
                  ? "bg-saffron/10 text-saffron"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-3.5 w-3.5 ${
                      s <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span>& up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clear All */}
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() =>
          onFilterChange({
            categories: [],
            priceRange: [299, 9999],
            sizes: [],
            colors: [],
            rating: null,
            gender: null,
          })
        }
      >
        <X className="mr-2 h-3 w-3" />
        Clear All Filters
      </Button>
    </div>
  );
}

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block lg:w-64 xl:w-72">
        <div className="sticky top-24 rounded-2xl border border-border bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-charcoal" style={{ fontFamily: "var(--font-playfair)" }}>
            Filters
          </h2>
          <FilterContent filters={filters} onFilterChange={onFilterChange} />
        </div>
      </aside>

      {/* Mobile */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            }
          />
          <SheetContent side="left" className="w-80 overflow-y-auto p-6">
            <SheetTitle className="mb-4 text-lg font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
              Filters
            </SheetTitle>
            <FilterContent filters={filters} onFilterChange={onFilterChange} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
