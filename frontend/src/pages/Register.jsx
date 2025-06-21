import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  phone: yup.string().required('Phone is required'),
  employeeId: yup.string().required('Employee ID is required'),
  department: yup.string().required('Department is required'),
});

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/api/auth/register', data);
      login(res.data.token, res.data.user);
      toast.success('Registration successful!');
      navigate('/menu');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              {...register('name')}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="text"
              {...register('phone')}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Employee ID</label>
            <input
              type="text"
              {...register('employeeId')}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500"
            />
            {errors.employeeId && <p className="text-red-500 text-sm mt-1">{errors.employeeId.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium">Department</label>
            <input
              type="text"
              {...register('department')}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary-500"
            />
            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register; 