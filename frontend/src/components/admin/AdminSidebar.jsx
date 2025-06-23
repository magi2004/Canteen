import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Utensils, 
  ShoppingCart, 
  Users, 
  BarChart3,
  Settings
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/foods', label: 'Food Management', icon: Utensils },
    { path: '/admin/orders', label: 'Order Management', icon: ShoppingCart },
    { path: '/admin/users', label: 'User Management', icon: Users },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">Admin Panel</h2>
        
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border-r-2 border-primary-600'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-400">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar; 