
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, FileText, Grid2X2, Search, Share, Users } from 'lucide-react';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navigation: React.FC = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Grid2X2 size={20} />, path: '/' },
    { id: 'campaigns', label: 'Campaigns', icon: <FileText size={20} />, path: '/campaigns' },
    { id: 'explore', label: 'Explore', icon: <Search size={20} />, path: '/explore' },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Award size={20} />, path: '/leaderboard' },
    { id: 'social', label: 'Social', icon: <Share size={20} />, path: '/social' },
    { id: 'profile', label: 'Profile', icon: <Users size={20} />, path: '/profile' },
  ];

  return (
    <div className="fixed w-full z-10 top-0 left-0 bg-gradient-to-b from-background/80 to-background/50 backdrop-blur-lg border-b border-border/50">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.id}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors",
                  activeItem === item.id
                    ? "text-tellnearn-yellow bg-tellnearn-yellow/10"
                    : "text-foreground/70 hover:text-tellnearn-yellow hover:bg-tellnearn-yellow/5"
                )}
                onClick={() => setActiveItem(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="border border-tellnearn-yellow/20 text-tellnearn-yellow hover:bg-tellnearn-yellow/10 hover:text-tellnearn-yellow"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
