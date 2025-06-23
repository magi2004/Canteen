import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initialization
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (food) => {
    setCart(prev => {
      const newCart = {
        ...prev,
        [food._id]: {
          ...food,
          quantity: (prev[food._id]?.quantity || 0) + 1
        }
      };
      return newCart;
    });
    toast.success(`${food.name} added to cart`);
  };

  const removeFromCart = (foodId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[foodId]?.quantity > 1) {
        newCart[foodId].quantity -= 1;
      } else {
        delete newCart[foodId];
      }
      return newCart;
    });
  };

  const updateQuantity = (foodId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(foodId);
    } else {
      setCart(prev => ({
        ...prev,
        [foodId]: {
          ...prev[foodId],
          quantity
        }
      }));
    }
  };

  const clearCart = () => {
    setCart({});
    toast.success('Cart cleared');
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return Object.values(cart).reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItems = () => {
    return Object.values(cart);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
    getCartItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 