import React, { useState } from "react";
import {
  Gift,
  Heart,
  Star,
  Check,
  CreditCard,
  Mail,
  Phone,
  ShoppingCart,
  Copy,
  X,
  ChevronDown,
} from "lucide-react";
import { useGiftCard } from "@/context/GiftCardContext";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const GiftCardFAQAccordion: React.FC = () => {
  const faqs = [
    {
      question: "Do gift cards expire?",
      answer: "No, our gift cards never expire. Your recipient can use them whenever they're ready to shop."
    },
    {
      question: "Can I use multiple gift cards on one order?",
      answer: "Yes, you can apply multiple gift cards to a single order until the full amount is covered."
    },
    {
      question: "What if I lose my gift card code?",
      answer: "Don't worry! Contact our customer support with your purchase details and we'll help you recover your gift card."
    },
    {
      question: "Can gift cards be refunded?",
      answer: "Gift cards are non-refundable, but they can be used for any products on our website with no restrictions."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-gray-50 rounded-lg border border-gray-200">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-100 transition-colors"
          >
            <h3 className="font-bold text-lg text-gray-900">{faq.question}</h3>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
          </button>
          {openIndex === index && (
            <div className="px-6 pb-6">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const GiftCard: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState(2000);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [createdGiftCard, setCreatedGiftCard] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    createGiftCard,
    addGiftCardToCart,
    state: giftCardState,
  } = useGiftCard();
  const { addToCart } = useCart();

  const predefinedAmounts = [500, 1000, 2000, 3000, 5000, 10000];

  const giftCardDesigns = [
    {
      id: 0,
      name: "Fitness Champion",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      gradient: "from-[#F9A245] to-[#FEB47B]",
      theme: "fitness",
    },
    {
      id: 1,
      name: "Wellness Journey",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      gradient: "from-green-500 to-teal-500",
      theme: "wellness",
    },
    {
      id: 2,
      name: "Strength & Power",
      image:
        "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=600&h=400&fit=crop",
      gradient: "from-purple-500 to-pink-500",
      theme: "strength",
    },
    {
      id: 3,
      name: "Nutrition Goals",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
      gradient: "from-blue-500 to-indigo-500",
      theme: "nutrition",
    },
  ];

  const benefits = [
    {
      icon: Gift,
      title: "Perfect Gift",
      description: "Give the gift of health and fitness to your loved ones",
    },
    {
      icon: Star,
      title: "No Expiry",
      description: "Our gift cards never expire, use them anytime",
    },
    {
      icon: Heart,
      title: "Personal Touch",
      description: "Add a custom message to make it more personal",
    },
    {
      icon: Check,
      title: "Instant Delivery",
      description: "Digital delivery straight to their inbox",
    },
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(parseInt(value) || 0);
    }
  };

  const handleCreateGiftCard = async () => {
    if (!recipientName || !recipientEmail || !senderName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (selectedAmount < 100) {
      toast({
        title: "Invalid Amount",
        description: "Gift card amount must be at least ₹100.",
        variant: "destructive",
      });
      return;
    }

    try {
      const newGiftCard = await createGiftCard({
        amount: selectedAmount,
        recipientName,
        recipientEmail,
        senderName,
        message,
        designId: selectedDesign,
      });

      setCreatedGiftCard(newGiftCard);
      setShowSuccess(true);

      toast({
        title: "Gift Card Created!",
        description: `Gift card with code ${newGiftCard.code} has been created successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create gift card. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBuyNow = () => {
    if (!createdGiftCard) return;

    const giftCardItem = {
      id: createdGiftCard.id,
      name: `Gift Card - ₹${createdGiftCard.amount}`,
      price: createdGiftCard.amount,
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
      category: "Gift Cards",
      brand: "O2 Nutrition",
      isGiftCard: true,
      giftCardData: createdGiftCard,
    };

    // Add to cart temporarily for payment processing
    addToCart(giftCardItem, 1);

    // Navigate directly to checkout/payment page
    window.location.href = "/checkout";
  };

  const copyGiftCardCode = () => {
    if (createdGiftCard) {
      navigator.clipboard.writeText(createdGiftCard.code);
      toast({
        title: "Code Copied!",
        description: "Gift card code has been copied to clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-6">
            Gift Cards
          </h1>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Give the perfect gift of health and wellness. Our gift cards are
            ideal for fitness enthusiasts and health-conscious loved ones.
          </p>
        </div>
      </section>

      {/* Quick Benefits */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-bold text-2xl sm:text-3xl text-gray-900 mb-3">
              Why Choose Our <span className="text-[#F9A245]">Gift Cards</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-md hover:border hover:border-[#F9A245] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#F9A245] to-[#FEB47B] rounded-full flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compact Gift Card Creator */}
      <section
        className="relative py-12 sm:py-16 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&h=1080&fit=crop')`,
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-bold text-2xl sm:text-3xl text-white mb-3">
              Create Your <span className="text-[#F9A245]">Gift Card</span>
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Quick and easy customization
            </p>
          </div>

          <div className="w-full">
            {/* Gift Card Layout */}
            <div className="w-full">
              <h3 className="text-2xl font-bold text-white text-center mb-8">Choose Your Perfect Gift Card</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Selection Cards */}
                <div className="lg:col-span-1 space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Quick Select</h4>
                  {predefinedAmounts.map((amount) => (
                    <div 
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`group cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-4 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                        selectedAmount === amount 
                          ? 'border-[#F9A246] bg-[#F9A246]/20' 
                          : 'border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">₹{amount.toLocaleString()}</div>
                          <div className="text-white/60 text-sm">Gift Card</div>
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          selectedAmount === amount
                            ? 'bg-[#F9A246] scale-110'
                            : 'bg-white/20 group-hover:bg-white/30'
                        }`}>
                          <Gift className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Gift Card Customizer */}
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-2xl h-full">
                    <div className="text-center mb-8">
                      <div className="w-24 h-24 bg-gradient-to-br from-[#F9A246] to-[#FEB47B] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Gift className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">O2 Nutrition Gift Card</h4>
                      <p className="text-white/80">Perfect for fitness enthusiasts & health lovers</p>
                    </div>

                    <div className="text-center mb-8">
                      <div className="text-7xl font-bold text-white mb-6">₹{selectedAmount.toLocaleString()}</div>
                      
                      <div className="flex items-center justify-center gap-6">
                        <button
                          onClick={() => setSelectedAmount(Math.max(500, selectedAmount - 500))}
                          className="w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white font-bold text-2xl transition-all duration-300 hover:scale-110 border border-white/30 shadow-lg"
                        >
                          -
                        </button>
                        
                        <div className="px-8 py-3 bg-white/10 rounded-full border border-white/20">
                          <span className="text-white font-medium">Adjust Amount</span>
                        </div>
                        
                        <button
                          onClick={() => setSelectedAmount(Math.min(50000, selectedAmount + 500))}
                          className="w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white font-bold text-2xl transition-all duration-300 hover:scale-110 border border-white/30 shadow-lg"
                        >
                          +
                        </button>
                      </div>
                      
                      <p className="text-white/60 text-sm mt-4">Range: ₹500 - ₹50,000 | Increment: ₹500</p>
                    </div>

                    <button
                      onClick={() => {
                        // Generate unique gift card code in format: O2CODE + timestamp + random
                        const timestamp = Date.now().toString();
                        const random = Math.random().toString().substr(2, 8);
                        const code = `O2CODE${timestamp}${random}`;
                        
                        // Create gift card data
                        const giftCardData = {
                          code: code,
                          amount: selectedAmount,
                          isValid: true,
                          isUsed: false,
                          createdAt: new Date().toISOString(),
                          expiresAt: null, // Never expires
                          usedAt: null
                        };
                        
                        // Store in localStorage (simulating backend storage)
                        const existingCards = JSON.parse(localStorage.getItem('giftCards') || '[]');
                        existingCards.push(giftCardData);
                        localStorage.setItem('giftCards', JSON.stringify(existingCards));
                        
                        const item = {
                          id: `gc-${Date.now()}`,
                          name: `Gift Card ₹${selectedAmount.toLocaleString()}`,
                          price: selectedAmount,
                          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
                          isGiftCard: true,
                          giftCardCode: code,
                          giftCardData: giftCardData
                        };
                        addToCart(item, 1);
                        // Mark this as a gift card purchase
                        sessionStorage.setItem('isGiftCardPurchase', 'true');
                        window.location.href = '/checkout';
                      }}
                      className="w-full bg-gradient-to-r from-[#F9A246] to-[#FEB47B] hover:from-[#FEB47B] hover:to-[#F9A246] text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-xl flex items-center justify-center gap-3"
                    >
                      <ShoppingCart className="w-7 h-7" />
                      Purchase Gift Card
                    </button>
                    
                    <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                        <Check className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <div className="text-white/80 text-sm font-medium">Never Expires</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                        <Mail className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <div className="text-white/80 text-sm font-medium">Instant Delivery</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                        <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                        <div className="text-white/80 text-sm font-medium">All Products</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              How It <span className="text-[#F9A245]">Works</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to send the perfect gift
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choose & Customize",
                description: "Select amount, design, and add personal message",
                icon: Gift,
              },
              {
                step: "2",
                title: "Secure Payment",
                description: "Complete your purchase with our secure checkout",
                icon: CreditCard,
              },
              {
                step: "3",
                title: "Instant Delivery",
                description:
                  "Gift card is delivered instantly to recipient's email",
                icon: Mail,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#F9A245] to-[#FEB47B] rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-[#F9A245] rounded-full flex items-center justify-center">
                    <span className="text-[#F9A245] font-bold text-sm">
                      {item.step}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Frequently Asked <span className="text-[#F9A245]">Questions</span>
            </h2>
          </div>

          <GiftCardFAQAccordion />
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gradient-to-br from-[#F9A245] to-[#FEB47B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold text-3xl sm:text-4xl text-white mb-4">
            Need Help?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our customer support team is here to help you with any questions
            about gift cards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@o2nutrition.com"
              className="inline-flex items-center bg-white text-[#F9A245] font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Support
            </a>
            <a
              href="tel:+911234567890"
              className="inline-flex items-center border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-[#F9A245] transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && createdGiftCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-green-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Gift Card Created!
              </h3>

              <p className="text-gray-600 mb-6">
                Your gift card has been created successfully. Here are the
                details:
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-600 mb-1">Gift Card Code</div>
                <div className="flex items-center justify-between bg-white rounded border p-3">
                  <span className="font-mono text-lg font-bold text-gray-900">
                    {createdGiftCard.code}
                  </span>
                  <button
                    onClick={copyGiftCardCode}
                    className="text-[#F9A245] hover:text-[#FEB47B] p-1"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <div className="text-gray-600">Amount</div>
                    <div className="font-semibold">
                      ₹{createdGiftCard.amount.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Recipient</div>
                    <div className="font-semibold">
                      {createdGiftCard.recipientName}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleBuyNow();
                    setShowSuccess(false);
                  }}
                  className="flex-1 px-4 py-3 bg-[#F9A245] text-white rounded-lg hover:bg-[#FEB47B] font-medium flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftCard;
