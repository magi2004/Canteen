import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  Package
} from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/admin/dashboard');
      setStats(res.data);
    } catch (error) {
      toast.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const statCards = [
    {
      title: 'Today\'s Orders',
      value: stats?.todayOrders || 0,
      icon: ShoppingCart,
      color: 'bg-blue-500',
      textColor: 'text-blue-500'
    },
    {
      title: 'Today\'s Revenue',
      value: `$${(stats?.todayRevenue || 0).toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-500',
      textColor: 'text-green-500'
    },
    {
      title: 'Pending Orders',
      value: stats?.pendingOrders || 0,
      icon: Package,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-500'
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-purple-500',
      textColor: 'text-purple-500'
    },
    {
      title: 'Low Stock Items',
      value: stats?.lowStockItems || 0,
      icon: AlertTriangle,
      color: 'bg-red-500',
      textColor: 'text-red-500'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to the canteen management dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                  <Icon className={`${stat.textColor}`} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center space-x-3">
                <Package className="text-blue-500" size={20} />
                <div>
                  <p className="font-medium">View Pending Orders</p>
                  <p className="text-sm text-gray-600">Manage orders that need attention</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="text-red-500" size={20} />
                <div>
                  <p className="font-medium">Check Low Stock Items</p>
                  <p className="text-sm text-gray-600">Review items that need restocking</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center space-x-3">
                <TrendingUp className="text-green-500" size={20} />
                <div>
                  <p className="font-medium">View Today's Sales</p>
                  <p className="text-sm text-gray-600">Check today's revenue and orders</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">System Online</span>
              </div>
              <span className="text-sm text-green-600">All systems operational</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Database</span>
              </div>
              <span className="text-sm text-blue-600">Connected</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium">Orders</span>
              </div>
              <span className="text-sm text-yellow-600">{stats?.pendingOrders || 0} pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 