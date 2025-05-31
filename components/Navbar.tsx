"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import { useAccount, useBalance } from "wagmi";
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faSearch, faShoppingCart);

export default function Navbar() {
  const { cartItems, showCart, setShowCart } = useCart();
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({
    address,
    enabled: !!address,
  })

  const formatAddress = (addr: string | undefined) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";
  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Blokkat Shop</h1>
          </div>

          {/* Search */}
          <div className="hidden md:block w-2/5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 pl-10 pr-4 text-sm border-none rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
              <div>
                  {!isConnected ? (
                    <w3m-button />
                  ) : (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                        <i className="fas fa-wallet text-indigo-600 mr-2"></i>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Balance</span>
                          <span className="text-sm font-medium">
                            {balanceData ? `${balanceData.formatted} ${balanceData.symbol}` : "Loading..."}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                        <i className="fas fa-user-circle text-indigo-600 mr-2"></i>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Address</span>
                          <span className="text-sm font-medium">{formatAddress(address)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
            <w3m-network-button />

            {/* Cart Icon */}
            <button onClick={() => setShowCart(true)} className="relative">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-gray-700 text-xl"
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
}
