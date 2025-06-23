import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import DarkModeToggle from '../DarkModeToggle';

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Canteen Management System</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <div className="flex items-center space-x-2">
              <User size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-red-600 transition"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar; 