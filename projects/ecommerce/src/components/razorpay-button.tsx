"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import toast from "react-hot-toast";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: RazorpayErrorResponse) => void) => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayErrorResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
  };
}

interface RazorpayButtonProps {
  amount: number; // in rupees
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  onSuccess: (paymentId: string) => void;
}

export function RazorpayButton({
  amount,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
}: RazorpayButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    setIsLoading(true);

    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_XXXXXXXXXX";

    const options: RazorpayOptions = {
      key,
      amount: Math.round(amount * 100), // convert to paise
      currency: "INR",
      name: "ThreadsWala",
      description: "Desi Style, Delivered Fast",
      prefill: {
        name: customerName,
        email: customerEmail,
        contact: customerPhone,
      },
      theme: {
        color: "#FF6B35",
      },
      handler: (response) => {
        setIsLoading(false);
        onSuccess(response.razorpay_payment_id);
      },
      modal: {
        ondismiss: () => {
          setIsLoading(false);
        },
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: RazorpayErrorResponse) => {
        setIsLoading(false);
        toast.error(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch {
      setIsLoading(false);
      toast.error("Unable to initialize payment. Please try again.");
    }
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full bg-saffron py-6 text-base font-semibold text-white hover:bg-saffron-dark"
        size="lg"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Pay with Razorpay
          </span>
        )}
      </Button>
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Shield className="h-3 w-3" />
        <span>100% Secure Checkout · SSL Encrypted</span>
      </div>
    </div>
  );
}
