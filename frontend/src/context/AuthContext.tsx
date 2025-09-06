import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { login as loginAPI, signup as signupAPI } from "@/lib/functions";
import { orderService } from "@/services/orderService";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

interface Address {
  id: string;
  type: "home" | "work" | "other";
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  items: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    variant?: string;
  }>;
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  addedAt: string;
}

interface AuthContextType {
  user: User | null;
  orders: Order[];
  addresses: Address[];
  wishlist: WishlistItem[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  addAddress: (address: Omit<Address, "id">) => Promise<boolean>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<boolean>;
  deleteAddress: (id: string) => Promise<boolean>;
  addToWishlist: (productId: string, productData?: { name: string; price: number; image: string }) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  createOrder: (orderData: any) => Promise<boolean>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem("nutri_user");
        const storedOrders = localStorage.getItem("nutri_orders");
        const storedAddresses = localStorage.getItem("nutri_addresses");
        const storedWishlist = localStorage.getItem("nutri_wishlist");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        if (storedOrders && storedUser) {
          setOrders(JSON.parse(storedOrders));
        }
        if (storedAddresses) {
          setAddresses(JSON.parse(storedAddresses));
        }
        if (storedWishlist) {
          const parsedWishlist = JSON.parse(storedWishlist);
          // Handle migration from old format (array of IDs) to new format (array of objects)
          if (parsedWishlist.length > 0 && typeof parsedWishlist[0] === 'string') {
            // Old format - convert to new format
            const migratedWishlist: WishlistItem[] = parsedWishlist.map((id: string) => ({
              id,
              name: `Product ${id}`,
              price: 0,
              image: '',
              addedAt: new Date().toISOString(),
            }));
            setWishlist(migratedWishlist);
            // Update localStorage with new format
            localStorage.setItem("nutri_wishlist", JSON.stringify(migratedWishlist));
          } else {
            // New format
            setWishlist(parsedWishlist);
          }
        }
      } catch (error) {
        console.error("Error loading auth data:", error);
      }
      setIsLoading(false);
    };

    // Use setTimeout to prevent blocking
    setTimeout(initializeAuth, 0);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("nutri_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("nutri_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("nutri_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("nutri_addresses", JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem("nutri_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const fetchUserOrders = async (userId: string) => {
    try {
      const apiOrders = await orderService.fetchUserOrders(userId);
      if (Array.isArray(apiOrders)) {
        const transformedOrders: Order[] = apiOrders.map((order: any) => ({
          id: order.id || order._id,
          orderNumber: order.orderNumber || `ORD-${Date.now()}`,
          date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
          status: order.status || 'pending',
          items: order.items || [],
          total: order.total || 0,
          shippingAddress: order.shippingAddress || {
            id: '1',
            type: 'home',
            firstName: 'User',
            lastName: 'Name',
            address: '123 Main St',
            city: 'Mumbai',
            state: 'Maharashtra',
            zipCode: '400001',
            phone: '+91 9876543210',
            isDefault: true
          },
          paymentMethod: order.paymentMethod || 'UPI',
          trackingNumber: order.trackingNumber
        }));
        setOrders(transformedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await loginAPI(email, password);

      if (response.success) {
        const userData: User = {
          id: response.data.user.id || response.data.user._id,
          email: response.data.user.email,
          firstName: response.data.user.firstName || "",
          lastName: response.data.user.lastName || "",
          phone: response.data.user.phone,
          createdAt: response.data.user.createdAt || new Date().toISOString(),
        };

        setUser(userData);

        if (response.data.token) {
          localStorage.setItem("nutri_token", response.data.token);
        }

        // Fetch real orders
        await fetchUserOrders(userData.id);

        // Fetch orders once on login
        // No auto-polling
        return true;
      } else {
        console.error("Login failed:", response.error);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await signupAPI(userData);

      if (response.success) {
        // Transform the API response to match our User interface
        const newUser: User = {
          id: response.data.id || response.data._id,
          email: response.data.email,
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          phone: response.data.phone,
          createdAt: response.data.createdAt || new Date().toISOString(),
        };

        setUser(newUser);
        return true;
      } else {
        console.error("Registration failed:", response.error);
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    setAddresses([]);
    setWishlist([]);
    localStorage.removeItem("nutri_user");
    localStorage.removeItem("nutri_token");
    localStorage.removeItem("nutri_orders");
    localStorage.removeItem("nutri_addresses");
    localStorage.removeItem("nutri_wishlist");
    localStorage.removeItem("wishlist");
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setUser({ ...user, ...userData });
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      return false;
    }
  };

  const addAddress = async (address: Omit<Address, "id">): Promise<boolean> => {
    try {
      const newAddress: Address = {
        ...address,
        id: Date.now().toString(),
      };

      setAddresses((prev) => [...prev, newAddress]);
      return true;
    } catch (error) {
      console.error("Add address error:", error);
      return false;
    }
  };

  const updateAddress = async (
    id: string,
    addressData: Partial<Address>
  ): Promise<boolean> => {
    try {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === id ? { ...addr, ...addressData } : addr
        )
      );
      return true;
    } catch (error) {
      console.error("Update address error:", error);
      return false;
    }
  };

  const deleteAddress = async (id: string): Promise<boolean> => {
    try {
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      return true;
    } catch (error) {
      console.error("Delete address error:", error);
      return false;
    }
  };

  const addToWishlist = (productId: string, productData?: { name: string; price: number; image: string }) => {
    setWishlist((prev) => {
      // Remove if already exists
      const filtered = prev.filter((item) => item.id !== productId);
      
      // Add new item
      const newItem: WishlistItem = {
        id: productId,
        name: productData?.name || `Product ${productId}`,
        price: productData?.price || 0,
        image: productData?.image || '',
        addedAt: new Date().toISOString(),
      };
      
      return [...filtered, newItem];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some((item) => item.id === productId);
  };

  const createOrder = async (orderData: any): Promise<boolean> => {
    if (!user) {
      console.error('Cannot create order: User not logged in');
      return false;
    }
    
    try {
      // Try API first
      const order = await orderService.createOrder({
        ...orderData,
        userId: user.id,
        customerEmail: user.email,
      });
      
      if (order) {
        await fetchUserOrders(user.id);
        return true;
      }
      
      // Fallback: Create order locally if API fails
      const newOrder: Order = {
        id: Date.now().toString(),
        orderNumber: `ORD-${Date.now()}`,
        date: new Date().toLocaleDateString(),
        status: 'pending',
        items: orderData.items || [],
        total: orderData.total || 0,
        shippingAddress: orderData.shippingAddress || {
          id: '1',
          type: 'home',
          firstName: user.firstName,
          lastName: user.lastName,
          address: '123 Main St',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001',
          phone: user.phone || '+91 9876543210',
          isDefault: true
        },
        paymentMethod: orderData.paymentMethod || 'UPI',
        trackingNumber: `TRK${Date.now()}`
      };
      
      setOrders(prev => [newOrder, ...prev]);
      return true;
    } catch (error) {
      console.error('Error creating order:', error);
      
      // Create order locally as fallback
      const newOrder: Order = {
        id: Date.now().toString(),
        orderNumber: `ORD-${Date.now()}`,
        date: new Date().toLocaleDateString(),
        status: 'pending',
        items: orderData.items || [],
        total: orderData.total || 0,
        shippingAddress: orderData.shippingAddress || {
          id: '1',
          type: 'home',
          firstName: user.firstName,
          lastName: user.lastName,
          address: '123 Main St',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001',
          phone: user.phone || '+91 9876543210',
          isDefault: true
        },
        paymentMethod: orderData.paymentMethod || 'UPI',
        trackingNumber: `TRK${Date.now()}`
      };
      
      setOrders(prev => [newOrder, ...prev]);
      return true;
    }
  };

  const value: AuthContextType = {
    user,
    orders,
    addresses,
    wishlist,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    createOrder,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
