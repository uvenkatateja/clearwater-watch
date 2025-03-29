import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Droplet, Gauge, Thermometer, Droplets } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/auth-context';

const Index = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-water-50 to-water-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-water-800">ClearWater Watch</h1>
          <p className="text-xl md:text-2xl text-water-700 mb-8 max-w-3xl mx-auto">
            Real-time water quality monitoring system for a cleaner and healthier environment
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {currentUser ? (
              <Button size="lg" asChild>
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
              </>
            )}
          </div>
          <div className="mt-16 relative">
            <div className="water-wave">
              <img 
                src="https://res.cloudinary.com/dtsvelh8c/image/upload/v1685023534/dashboard-preview_wvzaen.png" 
                alt="Water Quality Dashboard" 
                className="rounded-lg shadow-2xl mx-auto max-w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-water-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-water-100 p-3 rounded-full">
                  <Droplet className="h-8 w-8 text-water-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">pH Monitoring</h3>
              <p className="text-gray-600">Real-time pH level monitoring for water quality assessment</p>
            </div>
            
            <div className="bg-water-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-water-100 p-3 rounded-full">
                  <Gauge className="h-8 w-8 text-water-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">TDS Analysis</h3>
              <p className="text-gray-600">Total Dissolved Solids measurement for water purity</p>
            </div>
            
            <div className="bg-water-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-water-100 p-3 rounded-full">
                  <Thermometer className="h-8 w-8 text-water-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Temperature Tracking</h3>
              <p className="text-gray-600">Continuous water temperature monitoring</p>
            </div>
            
            <div className="bg-water-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-water-100 p-3 rounded-full">
                  <Droplets className="h-8 w-8 text-water-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assessment</h3>
              <p className="text-gray-600">Overall water quality condition evaluation</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-water-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-water-100 rounded-full flex items-center justify-center text-water-800 font-bold text-xl mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Sensor Measurement</h3>
              <p className="text-gray-600">Our sensors continuously measure pH, TDS, and temperature in your water source</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-water-100 rounded-full flex items-center justify-center text-water-800 font-bold text-xl mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Data Transmission</h3>
              <p className="text-gray-600">The collected data is transmitted to our secure cloud database in real-time</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-water-100 rounded-full flex items-center justify-center text-water-800 font-bold text-xl mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Analysis & Reporting</h3>
              <p className="text-gray-600">Access your data through our dashboard with detailed analysis and alerts</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-water-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to monitor your water quality?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join ClearWater Watch today and gain insights into your water quality parameters
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
