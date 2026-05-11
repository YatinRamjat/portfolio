"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  CreditCard,
  Smartphone,
  Building,
  Banknote,
  Shield,
  Lock,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CheckoutStepper } from "@/components/checkout-stepper";
import { RazorpayButton } from "@/components/razorpay-button";
import { useCartStore } from "@/store/cart-store";
import { indianStates } from "@/lib/data";
import { formatINR, getEstimatedDelivery, generateOrderId } from "@/lib/utils";
import toast from "react-hot-toast";

interface AddressForm {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  saveAddress: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [address, setAddress] = useState<AddressForm>({
    fullName: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    saveAddress: true,
  });

  const {
    items,
    getSubtotal,
    getDiscount,
    getDeliveryCharge,
    getCGST,
    getSGST,
    getGrandTotal,
    clearCart,
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-ivory">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <div className="animate-pulse space-y-4">
            <div className="h-12 rounded bg-gray-200" />
            <div className="h-64 rounded-xl bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const updateAddress = (field: keyof AddressForm, value: string | boolean) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (!address.fullName || !address.phone || !address.email || !address.addressLine1 || !address.city || !address.state || !address.pincode) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (address.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    if (address.pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePaymentSuccess = (paymentId: string) => {
    const orderId = generateOrderId();
    clearCart();
    router.push(`/order-success?orderId=${orderId}&paymentId=${paymentId}`);
  };

  const handleCOD = () => {
    const orderId = generateOrderId();
    clearCart();
    router.push(`/order-success?orderId=${orderId}&payment=cod`);
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <h1
            className="text-center text-2xl font-bold text-charcoal"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Checkout
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {/* Stepper */}
        <CheckoutStepper currentStep={currentStep} />

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Address */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="rounded-2xl border border-border bg-white p-6 sm:p-8"
              >
                <h2 className="flex items-center gap-2 text-lg font-bold text-charcoal" style={{ fontFamily: "var(--font-playfair)" }}>
                  <MapPin className="h-5 w-5 text-saffron" />
                  Delivery Address
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={address.fullName}
                      onChange={(e) => updateAddress("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="mt-1 flex">
                      <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                        +91
                      </span>
                      <Input
                        id="phone"
                        value={address.phone}
                        onChange={(e) => updateAddress("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="98765 43210"
                        className="rounded-l-none"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={address.email}
                      onChange={(e) => updateAddress("email", e.target.value)}
                      placeholder="your@email.com"
                      className="mt-1"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="addressLine1">Address Line 1 *</Label>
                    <Input
                      id="addressLine1"
                      value={address.addressLine1}
                      onChange={(e) => updateAddress("addressLine1", e.target.value)}
                      placeholder="House/Flat No., Street Name"
                      className="mt-1"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      value={address.addressLine2}
                      onChange={(e) => updateAddress("addressLine2", e.target.value)}
                      placeholder="Area, Landmark (Optional)"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={address.city}
                      onChange={(e) => updateAddress("city", e.target.value)}
                      placeholder="Enter city"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select
                      value={address.state}
                      onValueChange={(v) => updateAddress("state", v || "")}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={address.pincode}
                      onChange={(e) => updateAddress("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="400001"
                      className="mt-1"
                      maxLength={6}
                    />
                  </div>

                  <div className="flex items-center gap-2 sm:col-span-2">
                    <Checkbox
                      id="saveAddress"
                      checked={address.saveAddress}
                      onCheckedChange={(checked) => updateAddress("saveAddress", !!checked)}
                    />
                    <Label htmlFor="saveAddress" className="text-sm cursor-pointer">
                      Save this address for future orders
                    </Label>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button onClick={handleNext} className="bg-saffron text-white hover:bg-saffron-dark">
                    Continue to Review
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Review */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Order Items */}
                <div className="rounded-2xl border border-border bg-white p-6">
                  <h2 className="text-lg font-bold text-charcoal" style={{ fontFamily: "var(--font-playfair)" }}>
                    Order Items ({items.length})
                  </h2>
                  <div className="mt-4 space-y-3">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.size}-${item.color.name}`}
                        className="flex items-center gap-4 rounded-lg bg-ivory p-3"
                      >
                        <div className="relative h-16 w-14 overflow-hidden rounded-lg">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-charcoal">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.size} • {item.color.name} • Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-charcoal">
                          {formatINR(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div className="rounded-2xl border border-border bg-white p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-charcoal" style={{ fontFamily: "var(--font-playfair)" }}>
                      Delivery Address
                    </h2>
                    <Button variant="link" className="text-saffron" onClick={() => setCurrentStep(1)}>
                      Edit
                    </Button>
                  </div>
                  <div className="mt-3 text-sm text-charcoal/80">
                    <p className="font-medium text-charcoal">{address.fullName}</p>
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                    <p>Phone: +91 {address.phone}</p>
                    <p className="mt-2 text-sm text-green-600">
                      Estimated Delivery: {getEstimatedDelivery()}
                    </p>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="rounded-2xl border border-border bg-white p-6">
                  <h2 className="text-lg font-bold text-charcoal" style={{ fontFamily: "var(--font-playfair)" }}>
                    Price Details
                  </h2>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatINR(getSubtotal())}</span>
                    </div>
                    {getDiscount() > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-{formatINR(getDiscount())}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className={getDeliveryCharge() === 0 ? "text-green-600" : ""}>
                        {getDeliveryCharge() === 0 ? "FREE" : formatINR(getDeliveryCharge())}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CGST (9%)</span>
                      <span>{formatINR(getCGST())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SGST (9%)</span>
                      <span>{formatINR(getSGST())}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-base font-bold">
                      <span>Grand Total</span>
                      <span className="text-saffron">{formatINR(getGrandTotal())}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button onClick={handleNext} className="bg-saffron text-white hover:bg-saffron-dark">
                    Continue to Payment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-charcoal" style={{ fontFamily: "var(--font-playfair)" }}>
                    <CreditCard className="h-5 w-5 text-saffron" />
                    Payment Method
                  </h2>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="mt-6 space-y-3"
                  >
                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                        paymentMethod === "razorpay"
                          ? "border-saffron bg-saffron/5"
                          : "border-border hover:border-saffron/30"
                      }`}
                    >
                      <RadioGroupItem value="razorpay" />
                      <CreditCard className="h-5 w-5 text-saffron" />
                      <div>
                        <p className="text-sm font-semibold text-charcoal">Razorpay (Card / UPI / Net Banking)</p>
                        <p className="text-xs text-muted-foreground">Pay securely via Razorpay</p>
                      </div>
                    </label>

                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                        paymentMethod === "cod"
                          ? "border-saffron bg-saffron/5"
                          : "border-border hover:border-saffron/30"
                      }`}
                    >
                      <RadioGroupItem value="cod" />
                      <Banknote className="h-5 w-5 text-amber-600" />
                      <div>
                        <p className="text-sm font-semibold text-charcoal">Cash on Delivery</p>
                        <p className="text-xs text-muted-foreground">Pay when your order arrives</p>
                      </div>
                    </label>
                  </RadioGroup>

                  <Separator className="my-6" />

                  {/* Amount */}
                  <div className="mb-6 flex items-center justify-between rounded-lg bg-ivory p-4">
                    <span className="text-sm font-medium text-charcoal">Amount to Pay</span>
                    <span className="text-xl font-bold text-saffron">
                      {formatINR(getGrandTotal())}
                    </span>
                  </div>

                  {/* Payment Button */}
                  {paymentMethod === "razorpay" ? (
                    <RazorpayButton
                      amount={getGrandTotal()}
                      customerName={address.fullName}
                      customerEmail={address.email}
                      customerPhone={address.phone}
                      onSuccess={handlePaymentSuccess}
                    />
                  ) : paymentMethod === "cod" ? (
                    <Button
                      onClick={handleCOD}
                      className="w-full bg-saffron py-6 text-base font-semibold text-white hover:bg-saffron-dark"
                      size="lg"
                    >
                      <Banknote className="mr-2 h-5 w-5" />
                      Place Order (COD)
                    </Button>
                  ) : (
                    <Button
                      onClick={() => toast.error("This payment method is coming soon!")}
                      className="w-full bg-saffron py-6 text-base font-semibold text-white hover:bg-saffron-dark"
                      size="lg"
                    >
                      Pay {formatINR(getGrandTotal())}
                    </Button>
                  )}

                  {/* Security badges */}
                  <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>100% Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Lock className="h-4 w-4 text-green-600" />
                      <span>SSL Encrypted</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-saffron">
                      Razorpay
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Review
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
