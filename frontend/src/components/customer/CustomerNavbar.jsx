import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import DarkModeToggle from '../DarkModeToggle';

const CustomerNavbar = () => {
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/menu', label: 'Menu', icon: Menu },
    { path: '/cart', label: 'Cart', icon: ShoppingCart },
    { path: '/orders', label: 'Orders', icon: ShoppingCart },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/menu" className="text-xl font-bold text-primary-600 dark:text-primary-400">
            Canteen App
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition relative ${
                    location.pathname === item.path
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                  {item.path === '/cart' && getCartItemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartItemCount()}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <DarkModeToggle />
            <span className="text-sm text-gray-700 dark:text-gray-300">Welcome, {user?.name}</span>
            {user?.role === 'admin' && (
              <Link
                to="/admin/dashboard"
                className="bg-secondary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary-700 transition"
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-600 transition"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <DarkModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-600">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition relative ${
                      location.pathname === item.path
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                    {item.path === '/cart' && getCartItemCount() > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {getCartItemCount()}
                      </span>
                    )}
                  </Link>
                );
              })}
              {user?.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium bg-secondary-600 text-white hover:bg-secondary-700 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Admin Panel</span>
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full text-left"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default CustomerNavbar; 