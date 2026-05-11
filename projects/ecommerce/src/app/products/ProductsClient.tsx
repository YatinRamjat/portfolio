"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductCard } from "@/components/product-card";
import { FilterSidebar, FilterState } from "@/components/filter-sidebar";
import { ProductGridSkeleton } from "@/components/loading-skeleton";
import { products } from "@/lib/data";

const ITEMS_PER_PAGE = 8;

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "popular" },
];

export function ProductsContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [299, 9999],
    sizes: [],
    colors: [],
    rating: null,
    gender: null,
  });

  // Read URL params
  useEffect(() => {
    const category = searchParams.get("category");
    const gender = searchParams.get("gender");
    if (category) {
      setFilters((prev) => ({ ...prev, categories: [category] }));
    }
    if (gender) {
      setFilters((prev) => ({ ...prev, gender }));
    }
  }, [searchParams]);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [filters, sortBy]);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Gender filter
    if (filters.gender) {
      result = result.filter((p) => p.gender === filters.gender);
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Size filter
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => filters.sizes.includes(s))
      );
    }

    // Color filter
    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => filters.colors.includes(c.name))
      );
    }

    // Rating filter
    if (filters.rating !== null) {
      result = result.filter((p) => p.rating >= filters.rating!);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return result;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="border-b border-border bg-white paisley-bg">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1
            className="text-2xl font-bold text-charcoal sm:text-3xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            All Products
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filteredProducts.length} products found
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar filters={filters} onFilterChange={setFilters} />

          {/* Products */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="mb-6 flex items-center justify-between">
              <div className="lg:hidden">
                <FilterSidebar filters={filters} onFilterChange={setFilters} />
              </div>
              <div className="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="outline" size="sm">
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                        {sortOptions.find((o) => o.value === sortBy)?.label}
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end">
                    {sortOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={sortBy === option.value ? "text-saffron" : ""}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Grid */}
            {isLoading ? (
              <ProductGridSkeleton count={8} />
            ) : paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
                  {paginatedProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="icon"
                        onClick={() => setCurrentPage(i + 1)}
                        className={
                          currentPage === i + 1
                            ? "bg-saffron hover:bg-saffron-dark"
                            : ""
                        }
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-semibold text-charcoal">
                  No products found
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
