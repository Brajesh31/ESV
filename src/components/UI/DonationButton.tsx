import React from 'react';
import { Heart } from 'lucide-react';

interface DonationButtonProps {
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const DonationButton: React.FC<DonationButtonProps> = ({ 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-50'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      <Heart className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`} />
      <span>Donate</span>
    </button>
  );
};

export default DonationButton;