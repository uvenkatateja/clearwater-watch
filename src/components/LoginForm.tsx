
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/components/ui/use-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError('');
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Google login failed');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login - accepts any credentials
  const handleDemoLogin = () => {
    setIsLoading(true);
    
    // Set demo login in session storage
    sessionStorage.setItem('demoLogin', 'true');
    
    // Short timeout to simulate authentication
    setTimeout(() => {
      // Simulate successful login with toast notification
      toast({
        title: "Demo Login Successful",
        description: "Welcome to the ClearWater Watch dashboard!",
      });
      
      // Navigate to dashboard with state indicating demo login
      navigate('/dashboard', { state: { fromDemoLogin: true } });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && <p className="text-sm text-red-500">{error}</p>}
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          <Button variant="outline" type="button" onClick={handleGoogleLogin} disabled={isLoading}>
            Google
          </Button>
          <Button variant="secondary" type="button" onClick={handleDemoLogin} disabled={isLoading} className="bg-water-500 hover:bg-water-600 text-white">
            Demo Login (No Credentials Required)
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center text-muted-foreground">
          Don't have an account?{' '}
          <a
            onClick={() => navigate('/signup')}
            className="text-primary underline cursor-pointer hover:text-primary/80"
          >
            Sign up
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
