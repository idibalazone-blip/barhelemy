import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';

interface SplashProps {
  onFinish: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onFinish }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(onFinish, 500); // Wait for fade out
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out"
      style={{ opacity }}
    >
      <div className="animate-bounce">
        <Logo size="xl" />
      </div>
      <div className="absolute bottom-10 text-teal-600 text-sm font-bold tracking-widest">
        CHARGEMENT...
      </div>
    </div>
  );
};