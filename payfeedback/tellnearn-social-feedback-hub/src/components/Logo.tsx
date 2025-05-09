
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src="/lovable-uploads/c02f0f42-706b-43ff-ae26-f7ea82d4cd16.png"
        alt="TellnEarn Logo"
        className="h-10 w-auto"
      />
      <div className="flex flex-col">
        <span className="text-xl font-bold text-tellnearn-yellow">TellnEarn</span>
        <span className="text-xs text-tellnearn-yellow/80">Your Opinion Pays.</span>
      </div>
    </div>
  );
};

export default Logo;
