import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CreditCard,
  Truck,
  Lock,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Shield,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Checkout: React.FC = () => {
  const { state, clearCart } = useCart();
  const { createOrder } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

      // Create order data
      const orderData = {
        userId: "temp-user-id", // This should come from auth context
        customerEmail: formData.email,
        items: state.items.map((item) => ({
          id: item.id.toString(),
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          variant: item.variant || item.weight || undefined,
          isUpsell: item.isUpsell || false,
          upsellDiscount: item.upsellDiscount || 0,
          originalPrice: item.originalPrice || item.price,
        })),
        subtotal: state.total,
        total: finalTotalINR,
        shippingCost: shippingCostINR,
        discountAmount: 0, // Will be calculated based on applied coupons
        deliveryMethod: deliveryMethod,
        paymentMethod: paymentMethod.toUpperCase(),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          phone: formData.phone,
        },
      };

      // Create order
      const success = await createOrder(orderData);

      if (success) {
        toast({
          title: "Order Placed Successfully!",
          description: `Your order #${orderNumber} has been confirmed.`,
        });

        // Clear cart and redirect
        clearCart();
        const isGiftCardPurchase =
          sessionStorage.getItem("isGiftCardPurchase") === "true";
        sessionStorage.removeItem("isGiftCardPurchase");

        navigate(`/thank-you${isGiftCardPurchase ? "?giftcard=true" : ""}`, {
          state: {
            orderTotal: finalTotalINR,
            orderNumber,
          },
        });
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      toast({
        title: "Order Failed",
        description:
          "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-bold text-2xl mb-4">No Items in Cart</h1>
        <p className="text-gray-600 mb-6">
          Add some products to your cart before checkout.
        </p>
        <Link to="/">
          <Button className="bg-[#F9A245] hover:bg-[#e8913d] text-white">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  // Calculate pricing in INR (prices are already in INR)
  const subtotalINR = state.total;
  const deliveryCharges = {
    standard: subtotalINR >= 1500 ? 0 : 99, // Free above ₹1500
    express: 199,
    overnight: 399,
  };
  const shippingCostINR =
    deliveryCharges[deliveryMethod as keyof typeof deliveryCharges];
  const finalTotalINR = subtotalINR + shippingCostINR;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link
            to="/cart"
            className="flex items-center text-gray-600 hover:text-[#F9A245] transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Cart
          </Link>
        </div>
        <h1 className="font-bold text-3xl text-gray-900">Checkout</h1>
        <p className="text-gray-600 mt-2">Complete your order securely</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-8">
            {/* Contact Information */}
            <Card className="border-gray-200">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center text-gray-900">
                  <Mail className="h-5 w-5 mr-2 text-[#F9A245]" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1 focus:ring-[#F9A245] focus:border-[#F9A245]"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll send order updates to this email
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="border-gray-200">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center text-gray-900">
                  <MapPin className="h-5 w-5 mr-2 text-[#F9A245]" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label
                      htmlFor="firstName"
                      className="text-gray-700 font-medium"
                    >
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="mt-1 focus:ring-[#F9A245] focus:border-[#F9A245]"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="lastName"
                      className="text-gray-700 font-medium"
                    >
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="mt-1 focus:ring-[#F9A245] focus:border-[#F9A245]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="address"
                    className="text-gray-700 font-medium"
                  >
                    Street Address *
                  </Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="mt-1 focus:ring-[#F9A245] focus:border-[#F9A245]"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="apartment"
                    className="text-gray-700 font-medium"
                  >
                    Apartment, Suite, etc. (Optional)
                  </Label>
                  <Input
                    id="apartment"
                    placeholder="Apt 4B"
                    value={formData.apartment}
                    onChange={(e) =>
                      handleInputChange("apartment", e.target.value)
                    }
                    className="mt-1 focus:ring-[#F9A245] focus:border-[#F9A245]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-gray-700 font-medium">
                      City *
                    </Label>
                    <Input
                      id="city"
                      placeholder="Mumbai"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="mt-1 focus:ring-[#F9A245] focus:border-[#F9A245]"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="state"
                      className="text-gray-700 font-medium"
                    >
                      State *
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("state", value)
                      }
                    >
                      <SelectTrigger className="mt-1 focus:ring-[#F9A245] focus:border-[#F9A245]">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mh">Maharashtra</SelectItem>
                        <SelectItem value="dl">Delhi</SelectItem>
                        <SelectItem value="ka">Karnataka</SelectItem>
                        <SelectItem value="tn">Tamil Nadu</SelectItem>
                        <SelectItem value="gj">Gujarat</SelectItem>
                        <SelectItem value="rj">Rajasthan</SelectItem>
                        <SelectItem value="up">Uttar Pradesh</SelectItem>
                        <SelectItem value="wb">West Bengal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="zipCode"
                      className="text-gray-700 font-medium"
                    >
                      PIN Code *
                    </Label>
                    <Input
                      id="zipCode"
                      placeholder="400001"
                      value={formData.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                      className="mt-1 focus:ring-[#F9A245] focus:border-[#F9A245]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-1 focus:ring-[#F9A245] focus:border-[#F9A245]"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Method */}
            <Card className="border-gray-200">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center text-gray-900">
                  <Truck className="h-5 w-5 mr-2 text-[#F9A245]" />
                  Delivery Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-3">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      deliveryMethod === "standard"
                        ? "border-[#F9A245] bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setDeliveryMethod("standard")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            deliveryMethod === "standard"
                              ? "border-[#F9A245] bg-[#F9A245]"
                              : "border-gray-300"
                          }`}
                        >
                          {deliveryMethod === "standard" && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Standard Delivery
                          </h4>
                          <p className="text-sm text-gray-600">
                            5-7 business days
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {subtotalINR >= 1500 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            "₹99"
                          )}
                        </p>
                        {subtotalINR < 1500 && (
                          <p className="text-xs text-gray-500">
                            Free above ₹1500
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      deliveryMethod === "express"
                        ? "border-[#F9A245] bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setDeliveryMethod("express")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            deliveryMethod === "express"
                              ? "border-[#F9A245] bg-[#F9A245]"
                              : "border-gray-300"
                          }`}
                        >
                          {deliveryMethod === "express" && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Express Delivery
                          </h4>
                          <p className="text-sm text-gray-600">
                            2-3 business days
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">₹199</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      deliveryMethod === "overnight"
                        ? "border-[#F9A245] bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setDeliveryMethod("overnight")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            deliveryMethod === "overnight"
                              ? "border-[#F9A245] bg-[#F9A245]"
                              : "border-gray-300"
                          }`}
                        >
                          {deliveryMethod === "overnight" && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Overnight Delivery
                          </h4>
                          <p className="text-sm text-gray-600">
                            Next business day
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">₹399</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="border-gray-200">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center text-gray-900">
                  <CreditCard className="h-5 w-5 mr-2 text-[#F9A245]" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Payment Method Selection */}
                <div className="space-y-3">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "card"
                        ? "border-[#F9A245] bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          paymentMethod === "card"
                            ? "border-[#F9A245] bg-[#F9A245]"
                            : "border-gray-300"
                        }`}
                      >
                        {paymentMethod === "card" && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-gray-600" />
                        <span className="font-medium text-gray-900">
                          Credit/Debit Card
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "upi"
                        ? "border-[#F9A245] bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          paymentMethod === "upi"
                            ? "border-[#F9A245] bg-[#F9A245]"
                            : "border-gray-300"
                        }`}
                      >
                        {paymentMethod === "upi" && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-5 w-5 text-gray-600" />
                        <span className="font-medium text-gray-900">
                          UPI Payment
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "cod"
                        ? "border-[#F9A245] bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          paymentMethod === "cod"
                            ? "border-[#F9A245] bg-[#F9A245]"
                            : "border-gray-300"
                        }`}
                      >
                        {paymentMethod === "cod" && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-gray-600" />
                        <span className="font-medium text-gray-900">
                          Cash on Delivery
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Details (only show when card is selected) */}
                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div>
                      <Label
                        htmlFor="nameOnCard"
                        className="text-gray-700 font-medium"
                      >
                        Name on Card *
                      </Label>
                      <Input
                        id="nameOnCard"
                        placeholder="John Doe"
                        value={formData.nameOnCard}
                        onChange={(e) =>
                          handleInputChange("nameOnCard", e.target.value)
                        }
                        className="mt-1 focus:ring-[#F9A245] focus:border-[#F9A245]"
                        required
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="cardNumber"
                        className="text-gray-700 font-medium"
                      >
                        Card Number *
                      </Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) =>
                          handleInputChange("cardNumber", e.target.value)
                        }
                        className="mt-1 focus:ring-[#F9A245] focus:border-[#F9A245]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="expiryDate"
                          className="text-gray-700 font-medium"
                        >
                          Expiry Date *
                        </Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) =>
                            handleInputChange("expiryDate", e.target.value)
                          }
                          className="mt-1 focus:ring-[#F9A245] focus:border-[#F9A245]"
                          required
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="cvv"
                          className="text-gray-700 font-medium"
                        >
                          CVV *
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) =>
                            handleInputChange("cvv", e.target.value)
                          }
                          className="mt-1 focus:ring-[#F9A245] focus:border-[#F9A245]"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Lock className="h-4 w-4" />
                      <span>
                        Your payment information is secure and encrypted
                      </span>
                    </div>
                  </div>
                )}

                {/* UPI Details (only show when UPI is selected) */}
                {paymentMethod === "upi" && (
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div>
                      <Label
                        htmlFor="upiId"
                        className="text-gray-700 font-medium"
                      >
                        UPI ID *
                      </Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@paytm"
                        className="mt-1 focus:ring-[#F9A245] focus:border-[#F9A245]"
                        required
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>
                        You will be redirected to your UPI app to complete the
                        payment
                      </p>
                    </div>
                  </div>
                )}

                {/* COD Details (only show when COD is selected) */}
                {paymentMethod === "cod" && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800">
                            Cash on Delivery
                          </h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            Pay ₹{finalTotalINR.toLocaleString()} when your
                            order is delivered. Please keep exact change ready.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#F9A245] hover:bg-[#e8913d] text-white"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                `Complete Order - ₹${finalTotalINR.toLocaleString()}`
              )}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 space-y-4 pt-6">
              {/* Order Items */}
              <div className="space-y-3">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        Qty: {item.quantity}
                        {item.variant && ` • ${item.variant}`}
                        {item.weight && ` • ${item.weight}`}
                      </p>
                    </div>
                    <p className="font-medium text-[#F9A245]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Pricing Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({state.itemCount} items)
                  </span>
                  <span className="font-medium">
                    ₹{subtotalINR.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {deliveryMethod === "standard" && "Standard Delivery"}
                    {deliveryMethod === "express" && "Express Delivery"}
                    {deliveryMethod === "overnight" && "Overnight Delivery"}
                  </span>
                  <span className="font-medium">
                    {shippingCostINR === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${shippingCostINR}`
                    )}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span className="text-gray-900">Total</span>
                  <span className="text-[#F9A245]">
                    ₹{finalTotalINR.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Secure checkout powered by SSL encryption</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
