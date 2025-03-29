
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SignupForm from '@/components/SignupForm';
import { useAuth } from '@/context/auth-context';

const Signup = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 bg-gradient-to-b from-water-50 to-water-100">
        <div className="w-full max-w-md px-4">
          <SignupForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
