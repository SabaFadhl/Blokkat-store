"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useReadContract, useBalance } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/constants";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  const { data, isLoading, error } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getAllProducts",
  });

useEffect(() => {
  if (Array.isArray(data)) {
    const parsed =(data as any[]).map((p: any) => ({
      id: Number(p.id),
      name: p.name,
      image: p.image,
      fiatPrice: Number(p.fiatPrice),
      quantity: Number(p.quantity),
    }));
    setProducts(parsed);
  }
}, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  const { addToCart, setShowCart } = useCart();
  type Product = {
    id: number;
    name: string;
    image: string;
    fiatPrice: number;
    quantity: number;
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setShowCart(true);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 pt-20">
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {product.name}
                </h3>
                <div className="flex flex-col mb-4">
                  <div className="flex items-center">
                    <i className="fab fa-ethereum text-indigo-600 mr-1"></i>
                    <span className="font-semibold text-indigo-600">
                      {product.quantity} Available Quantity
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ${product.fiatPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
