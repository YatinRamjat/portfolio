"use client";

import { Check } from "lucide-react";

interface CheckoutStepperProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Address" },
  { number: 2, label: "Review" },
  { number: 3, label: "Payment" },
];

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                currentStep > step.number
                  ? "border-saffron bg-saffron text-white"
                  : currentStep === step.number
                  ? "border-saffron bg-saffron/10 text-saffron"
                  : "border-gray-200 bg-white text-gray-400"
              }`}
            >
              {currentStep > step.number ? (
                <Check className="h-5 w-5" />
              ) : (
                step.number
              )}
            </div>
            <span
              className={`mt-2 text-xs font-medium ${
                currentStep >= step.number
                  ? "text-saffron"
                  : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connector */}
          {index < steps.length - 1 && (
            <div
              className={`mx-3 h-0.5 w-12 sm:w-20 lg:w-32 ${
                currentStep > step.number ? "bg-saffron" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
