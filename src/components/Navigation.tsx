
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BarChart, TrendingUp, LineChart } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: null },
    { path: '/dashboard', label: 'Dashboard', icon: <BarChart className="w-4 h-4 mr-2" /> },
    { path: '/compare', label: 'Compare', icon: <LineChart className="w-4 h-4 mr-2" /> },
    { path: '/insights', label: 'Insights', icon: <TrendingUp className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        isScrolled ? "bg-white/80 dark:bg-guru-darkGray/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-guru-red flex items-center justify-center">
            <span className="text-white font-bold text-sm">YG</span>
          </div>
          <span className="font-semibold text-lg text-guru-darkGray dark:text-white">ChannelGuru</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? "default" : "ghost"}
                className={cn(
                  "rounded-md transition-all",
                  location.pathname === item.path 
                    ? "bg-accent text-accent-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                size="sm"
              >
                {item.icon}
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="rounded-full">
            Sign In
          </Button>
          <Button variant="default" size="sm" className="rounded-full bg-guru-red hover:bg-guru-red/90">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
