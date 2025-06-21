import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Plus, Minus, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetchFoods();
    fetchCategories();
  }, []);

  const fetchFoods = async () => {
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory) params.category = selectedCategory;
      
      const res = await axios.get('/api/foods', { params });
      setFoods(res.data);
    } catch (error) {
      toast.error('Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/foods/categories/list');
      setCategories(res.data);
    } catch (error) {
      console.error('Failed to load categories');
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [searchTerm, selectedCategory]);

  const addToCart = (food) => {
    setCart(prev => ({
      ...prev,
      [food._id]: {
        ...food,
        quantity: (prev[food._id]?.quantity || 0) + 1
      }
    }));
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

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return Object.values(cart).reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters and Search */}
        <div className="lg:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            
            {/* Search */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search foods..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-primary-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Cart Summary */}
            {Object.keys(cart).length > 0 && (
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Cart Summary</h3>
                <div className="space-y-2 text-sm">
                  {Object.values(cart).map(item => (
                    <div key={item._id} className="flex justify-between">
                      <span>{item.name} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 font-medium">
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Food Items */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map(food => (
              <div key={food._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {food.image && (
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{food.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{food.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary-600">
                      ${food.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {food.currentStock}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {cart[food._id] ? (
                        <>
                          <button
                            onClick={() => removeFromCart(food._id)}
                            className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-medium">{cart[food._id].quantity}</span>
                          <button
                            onClick={() => addToCart(food)}
                            className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                          >
                            <Plus size={16} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => addToCart(food)}
                          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition"
                        >
                          <ShoppingCart size={16} />
                          <span>Add to Cart</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {foods.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No foods found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu; 