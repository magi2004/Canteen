import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../../contexts/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal, 
    getCartItemCount 
  } = useCart();
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const removeItem = (foodId) => {
    removeFromCart(foodId);
    toast.success('Item removed from cart');
  };

  const getTotal = () => {
    return getCartTotal();
  };

  const getItemCount = () => {
    return getCartItemCount();
  };

  const handlePlaceOrder = async () => {
    if (Object.keys(cart).length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        items: Object.values(cart).map(item => ({
          foodId: item._id,
          quantity: item.quantity
        })),
        specialInstructions,
        paymentMethod
      };

      await axios.post('/api/orders', orderData);
      
      // Clear cart
      clearCart();
      
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (Object.keys(cart).length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Your Cart is Empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Add some delicious items to your cart to get started!</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold dark:text-gray-100">Cart Items ({getItemCount()})</h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {Object.values(cart).map(item => (
                <div key={item._id} className="p-6 flex items-center space-x-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold dark:text-gray-100">{item.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    <p className="text-primary-600 dark:text-primary-400 font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-medium w-8 text-center dark:text-gray-100">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold dark:text-gray-100">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 mt-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Order Summary</h2>
            
            {/* Special Instructions */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Special Instructions</label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Any special requests..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                rows="3"
              />
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="digital_wallet">Digital Wallet</option>
              </select>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <div className="flex justify-between mb-2">
                <span className="dark:text-gray-300">Subtotal:</span>
                <span className="dark:text-gray-300">${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span className="dark:text-gray-100">Total:</span>
                <span className="dark:text-gray-100">${getTotal().toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 transition mt-6 disabled:opacity-50"
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 