const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/canteen-app');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@canteen.com' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@canteen.com');
      console.log('Password: admin123');
      process.exit(0);
    }

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@canteen.com',
      password: 'admin123',
      phone: '1234567890',
      employeeId: 'ADMIN001',
      department: 'Administration',
      role: 'admin',
      isActive: true
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@canteen.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Role: Admin');
    console.log('\nYou can now login to the admin panel using these credentials.');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

createAdminUser(); 