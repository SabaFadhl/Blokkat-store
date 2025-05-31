"use client";
import { createContext, useContext, useState } from "react";

// Create the cart context
const CartContext = createContext();

// Custom hook to access cart context
export const useCart = () => useContext(CartContext);

// Context provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  // Add an item to the cart
  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Show cart after adding item
    setShowCart(true);
  };

  // Increase quantity
  const increaseQuantity = (index) => {
    setCartItems((prevCart) => {
      const updated = [...prevCart];
      updated[index].quantity += 1;
      return updated;
    });
  };

  // Decrease quantity
  const decreaseQuantity = (index) => {
    setCartItems((prevCart) => {
      const updated = [...prevCart];
      if (updated[index].quantity > 1) {
        updated[index].quantity -= 1;
      } else {
        updated.splice(index, 1);
      }
      return updated;
    });
  };

  // Remove item completely
  const removeFromCart = (productId) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Clear the cart
  const clearCart = () => setCartItems([]);

  // Checkout
  const checkout = () => {
    setShowCart(false);
    setShowCheckout(true);
    setCurrentStep(0);
  };

  const closeCheckout = () => setShowCheckout(false);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const placeOrder = () => {
    setShowCheckout(false);
    setShowOrderConfirmation(true);
    setCartItems([]);
  };

  const closeOrderConfirmation = () => {
    setShowOrderConfirmation(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        showCart,
        setShowCart,
        showCheckout,
        checkout,
        closeCheckout,
        currentStep,
        nextStep,
        placeOrder,
        showOrderConfirmation,
        closeOrderConfirmation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
