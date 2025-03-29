
import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-water-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Droplet className="h-6 w-6 text-water-300" />
              <span className="font-bold text-xl text-water-300">ClearWater Watch</span>
            </div>
            <p className="text-water-100/80 text-sm">
              Monitoring water quality parameters in real-time for a cleaner and healthier environment.
            </p>
            <div className="flex space-x-4 pt-2">
              <Facebook className="h-5 w-5 text-water-300 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-water-300 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-water-300 hover:text-white cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-water-300 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-water-100/80 hover:text-white text-sm">Home</Link></li>
              <li><Link to="/about" className="text-water-100/80 hover:text-white text-sm">About Us</Link></li>
              <li><Link to="/features" className="text-water-100/80 hover:text-white text-sm">Features</Link></li>
              <li><Link to="/contact" className="text-water-100/80 hover:text-white text-sm">Contact</Link></li>
              <li><Link to="/login" className="text-water-100/80 hover:text-white text-sm">Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-water-300 mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-water-100/80 hover:text-white text-sm">Water Quality Monitoring</Link></li>
              <li><Link to="/features" className="text-water-100/80 hover:text-white text-sm">Real-time Alerts</Link></li>
              <li><Link to="/features" className="text-water-100/80 hover:text-white text-sm">Data Analysis</Link></li>
              <li><Link to="/features" className="text-water-100/80 hover:text-white text-sm">Water Management</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-water-300 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-water-300" />
                <span className="text-water-100/80 text-sm">+1 (234) 567-8901</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-water-300" />
                <span className="text-water-100/80 text-sm">contact@clearwaterwatch.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-water-300" />
                <span className="text-water-100/80 text-sm">123 Water St, Ocean City, Earth</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-water-700 mt-8 pt-6 text-center text-water-100/60 text-sm">
          <p>&copy; {new Date().getFullYear()} ClearWater Watch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
