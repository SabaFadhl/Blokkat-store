"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import PayButton from "./PayButton";

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const decreaseQuantity = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      addToCart({ ...item, quantity: -1 }); // or implement a custom decrease function
    }
  };

  const increaseQuantity = (item) => {
    addToCart(item);
  };

  const totalCrypto = 0.00432;
  const totalFiat = cartItems.reduce((sum, item) => sum + item.fiatPrice * item.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full overflow-auto">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <FontAwesomeIcon icon="shopping-cart" className="text-gray-300 text-5xl mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center p-3 border rounded-lg">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <div className="text-sm text-indigo-600 font-medium">{item.fiatPrice} $</div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => decreaseQuantity(item)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 bg-gray-100 rounded-full"
                    >
                      <FontAwesomeIcon icon={faMinus} className="text-xs" />
                    </button>
                    <span className="mx-2 w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 bg-gray-100 rounded-full"
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total:</span>
            <div className="text-right">
              <div className="font-semibold text-indigo-600">{totalFiat.toFixed(3)} $</div>
              <div className="font-semibold text-indigo-600">{totalCrypto.toFixed(5)} ETH</div>
            </div>
          </div>
          <div className="space-y-2">
            {/* Use the PayButton component */}
            <PayButton cartItems={cartItems} />
            <button
              onClick={onClose}
              className="w-full py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}