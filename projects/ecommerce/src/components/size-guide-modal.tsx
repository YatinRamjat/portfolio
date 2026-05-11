"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ruler } from "lucide-react";

const sizeData = [
  { size: "XS", chest: "34", waist: "28", hip: "36", length: "38" },
  { size: "S", chest: "36", waist: "30", hip: "38", length: "39" },
  { size: "M", chest: "38", waist: "32", hip: "40", length: "40" },
  { size: "L", chest: "40", waist: "34", hip: "42", length: "41" },
  { size: "XL", chest: "42", waist: "36", hip: "44", length: "42" },
  { size: "XXL", chest: "44", waist: "38", hip: "46", length: "43" },
  { size: "3XL", chest: "46", waist: "40", hip: "48", length: "44" },
];

export function SizeGuideModal() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="link" className="h-auto p-0 text-xs text-saffron">
            <Ruler className="mr-1 h-3 w-3" />
            Size Guide
          </Button>
        }
      />
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Size Guide
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-4">
          All measurements are in inches. For the best fit, measure yourself and compare with the chart below.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-saffron/5">
                <th className="px-4 py-3 text-left font-semibold text-charcoal">Size</th>
                <th className="px-4 py-3 text-left font-semibold text-charcoal">Chest</th>
                <th className="px-4 py-3 text-left font-semibold text-charcoal">Waist</th>
                <th className="px-4 py-3 text-left font-semibold text-charcoal">Hip</th>
                <th className="px-4 py-3 text-left font-semibold text-charcoal">Length</th>
              </tr>
            </thead>
            <tbody>
              {sizeData.map((row) => (
                <tr key={row.size} className="border-b last:border-0 hover:bg-saffron/5">
                  <td className="px-4 py-2.5 font-medium text-saffron">{row.size}</td>
                  <td className="px-4 py-2.5">{row.chest}&quot;</td>
                  <td className="px-4 py-2.5">{row.waist}&quot;</td>
                  <td className="px-4 py-2.5">{row.hip}&quot;</td>
                  <td className="px-4 py-2.5">{row.length}&quot;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
