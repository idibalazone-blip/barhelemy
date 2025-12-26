import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'blue' | 'white';
}

export const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  
  // Dimensions en pixels pour l'affichage
  let width = 40; 
  if (size === 'sm') width = 24;
  if (size === 'md') width = 40;
  if (size === 'lg') width = 120;
  if (size === 'xl') width = 200; // Taille 200x200 demandée pour le Splash Screen

  const primaryColor = "#0F766E"; // Turquoise foncé / Sarcelle

  return (
    <svg 
      width={width} 
      height={width} 
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo OK PLACE"
    >
      <defs>
        <style>
          {`
            .logo-text { 
              font-family: ui-sans-serif, system-ui, sans-serif; 
              font-weight: 900; 
              fill: white; 
            }
          `}
        </style>
      </defs>

      <g>
        {/* Toit de la maison (Triangle) */}
        <path 
          d="M250 60 L60 220 H440 L250 60 Z" 
          fill={primaryColor} 
          stroke={primaryColor}
          strokeWidth="10"
          strokeLinejoin="round"
        />
        
        {/* Corps de la maison */}
        <rect x="110" y="210" width="280" height="80" fill={primaryColor} />

        {/* Fenêtre (4 carreaux blancs) */}
        <g transform="translate(0, 10)">
            <rect x="215" y="150" width="30" height="30" fill="white" />
            <rect x="255" y="150" width="30" height="30" fill="white" />
            <rect x="215" y="190" width="30" height="30" fill="white" />
            <rect x="255" y="190" width="30" height="30" fill="white" />
        </g>

        {/* Bannière rectangulaire large contenant le texte */}
        <rect x="20" y="290" width="460" height="130" rx="5" fill={primaryColor} />

        {/* Texte OK PLACE */}
        <text 
          x="250" 
          y="385" 
          textAnchor="middle" 
          className="logo-text" 
          fontSize="95" 
          letterSpacing="2"
        >
          OK PLACE
        </text>
      </g>
    </svg>
  );
};