import React from 'react';
import { Box, Typography } from '@mui/material';

// App version
export const APP_VERSION = 'v1.0.0';
export const BUILD_NUMBER = '20240322.1';

const ToneTrekLogo = ({ theme }) => {
  const mainColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;
  const glowEffect = theme.name === 'cyberpunk' ? '0 0 10px rgba(0, 240, 255, 0.8)' : 'none';
  
  return (
    <Box sx={{ textAlign: 'center', mb: 3 }}>
      <svg
        width="300"
        height="80"
        viewBox="0 0 300 80"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: `drop-shadow(${glowEffect})` }}
      >
        {/* Delta Shape */}
        <path
          d="M40 10 L70 70 L10 70 Z"
          fill="none"
          stroke={mainColor}
          strokeWidth="3"
        />
        
        {/* Text Path - Extended to show full text */}
        <path
          id="textPath"
          d="M75 30 L290 30"
          fill="none"
          stroke="none"
        />
        
        <text
          fontSize="28"
          fontFamily={theme.name === 'cyberpunk' ? 'Orbitron' : 'Arial'}
          fontWeight="bold"
          fill="url(#logoGradient)"
          letterSpacing="1"
        >
          <textPath xlinkHref="#textPath">TONE TREK</textPath>
        </text>
        
        {/* Subtitle Path */}
        <path
          id="subtitlePath"
          d="M90 50 L290 50"
          fill="none"
          stroke="none"
        />
        
        <text
          fontSize="12"
          fontFamily={theme.typography.fontFamily}
          fill={theme.palette.text.secondary}
          opacity="0.9"
          letterSpacing={theme.name === 'cyberpunk' ? '2' : '1'}
        >
          <textPath xlinkHref="#subtitlePath">COLOR PALETTE EXTRACTOR</textPath>
        </text>
        
        {/* Color Palette Elements */}
        <rect x="20" y="40" width="10" height="10" fill={mainColor} />
        <rect x="35" y="40" width="10" height="10" fill={secondaryColor} />
        <rect x="50" y="40" width="10" height="10" fill={mainColor} opacity="0.7" />
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={mainColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
};

export default ToneTrekLogo; 