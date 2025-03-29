
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Droplet } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

const Navbar = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary';
  };

  return (
    <nav className="w-full bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Droplet className="h-6 w-6 text-primary animate-flow" />
          <span className="font-bold text-xl text-primary">ClearWater Watch</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`text-sm ${isActive('/')}`}>Home</Link>
          <Link to="/about" className={`text-sm ${isActive('/about')}`}>About</Link>
          <Link to="/features" className={`text-sm ${isActive('/features')}`}>Features</Link>
          <Link to="/contact" className={`text-sm ${isActive('/contact')}`}>Contact</Link>
          {currentUser && (
            <Link to="/dashboard" className={`text-sm ${isActive('/dashboard')}`}>Dashboard</Link>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm hidden md:inline-block">Hello, {currentUser.email?.split('@')[0] || 'User'}</span>
              <Button variant="outline" size="sm" onClick={() => logout()}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" className="hidden md:inline-flex" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
