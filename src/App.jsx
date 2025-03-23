import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, Paper, IconButton, Stack, Alert, CircularProgress, Tooltip, Snackbar, Menu, MenuItem, ListItemText, ListItemIcon, Link } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import RefreshIcon from '@mui/icons-material/Refresh';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import TagIcon from '@mui/icons-material/Tag';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import GitHubIcon from '@mui/icons-material/GitHub';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useTheme } from './contexts/ThemeContext';
import { styled } from '@mui/material/styles';
import ToneTrekLogo, { APP_VERSION, BUILD_NUMBER } from './assets/ToneTrekLogo';

const UploadBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.container : theme.palette.grey[50],
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.action.hover : theme.palette.grey[100],
  },
  border: theme.name === 'cyberpunk' ? '1px solid rgba(0, 240, 255, 0.3)' : 'none',
  boxShadow: theme.name === 'cyberpunk' 
    ? '0 0 10px rgba(0, 240, 255, 0.2), inset 0 0 5px rgba(0, 240, 255, 0.1)' 
    : theme.shadows[2],
  borderRadius: theme.name === 'cyberpunk' ? '4px' : '8px',
  transition: 'all 0.3s ease',
}));

const ColorPalette = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(3.5),
  marginBottom: theme.spacing(2.5),
  justifyContent: 'center',
  flexWrap: 'nowrap',
}));

const ColorSwatch = styled(Box)(({ color, theme, isLocked }) => ({
  width: 140,
  height: 140,
  backgroundColor: color,
  borderRadius: theme.name === 'cyberpunk' ? '2px' : '8px',
  boxShadow: theme.name === 'cyberpunk'
    ? `0 0 15px rgba(0, 0, 0, 0.4), 0 0 ${isLocked ? '10px' : '5px'} ${color}` 
    : '0 2px 4px rgba(0,0,0,0.1)',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  padding: '8px',
  position: 'relative',
  '&:hover .copy-buttons': {
    opacity: 1
  },
  border: theme.name === 'cyberpunk' ? `1px solid ${isLocked ? color : 'rgba(255, 255, 255, 0.1)'}` : 'none',
  transition: 'all 0.3s ease',
}));

// Custom styled button for different themes
const ThemedButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60px',
  height: '60px',
  minWidth: '60px',
  padding: 0,
  borderRadius: '50%',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  
  ...(theme.name === 'cyberpunk' && {
    borderRadius: '2px',
    border: '1px solid rgba(0, 240, 255, 0.5)',
    background: 'rgba(0, 240, 255, 0.1)',
    color: '#00f0ff',
    fontFamily: '"Orbitron", sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    '&:hover': {
      background: 'rgba(0, 240, 255, 0.2)',
      boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '2px',
      boxShadow: '0 0 5px rgba(0, 240, 255, 0.5)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    '&:hover::after': {
      opacity: 1,
    }
  })
}));

// Modern upload icon component
const UploadIcon = ({ theme }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 16V8M12 8L9 11M12 8L15 11" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeDasharray={theme.name === 'cyberpunk' ? "1 3" : "0"}
    />
  </svg>
);

// Footer Component
const Footer = ({ theme }) => {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        px: 3,
        textAlign: 'center',
        borderTop: '1px solid',
        borderColor: 'divider',
        opacity: 0.9,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(245, 245, 245, 0.8)'
      }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ fontFamily: theme.typography.fontFamily }}>
        © {new Date().getFullYear()} ToneTrek by Tamujin
      </Typography>
      
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: theme.typography.fontFamily }}>
          <Link href="#" color="inherit">Privacy</Link>
          <Box component="span" sx={{ mx: 1 }}>•</Box>
          <Link href="#" color="inherit">Terms</Link>
          <Box component="span" sx={{ mx: 1 }}>•</Box>
          <Link href="#" color="inherit">Contact</Link>
        </Typography>
      </Stack>
      
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: theme.typography.fontFamily }}>
          {APP_VERSION}
        </Typography>
        <Link href="https://github.com/Tamujin/ToneTrek" target="_blank" rel="noopener noreferrer" color="inherit">
          <GitHubIcon sx={{ fontSize: 16, opacity: 0.7 }} />
        </Link>
      </Stack>
    </Box>
  );
};

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [palette, setPalette] = useState([]);
  const [lockedColors, setLockedColors] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [themeMenu, setThemeMenu] = useState(null);
  const { theme, currentTheme, changeTheme, availableThemes } = useTheme();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('refresh'); // 'refresh', 'load', 'remove'
  const notificationTimeoutRef = useRef(null);

  const handleImageUpload = (event) => {
    setError(null);
    setIsLoading(false);
    setPalette([]);
    
    const file = event.target.files[0];
    if (!file) {
      setError('Please select an image file.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('Image size should be less than 5MB.');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      
      // Show load notification
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
      setNotificationType('load');
      setShowNotification(true);
      notificationTimeoutRef.current = setTimeout(() => {
        setShowNotification(false);
      }, 1000);
      
      extractColors(e.target.result);
    };

    reader.onerror = () => {
      setError('Failed to read the image file.');
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const extractColors = async (imageUrl) => {
    setError(null);
    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const colors = {};
      const sampleSize = 1000; // Number of random pixels to sample
      const totalPixels = imageData.length / 4;
      
      for (let i = 0; i < sampleSize; i++) {
        const randomPixel = Math.floor(Math.random() * totalPixels) * 4;
        const r = imageData[randomPixel];
        const g = imageData[randomPixel + 1];
        const b = imageData[randomPixel + 2];
        const rgb = `rgb(${r},${g},${b})`;
        colors[rgb] = (colors[rgb] || 0) + 1;
      }

      // Sort colors by frequency
      const sortedColors = Object.entries(colors)
        .sort(([, a], [, b]) => b - a)
        .map(([color]) => color);
      
      // Take top 5 colors or fewer if not enough colors found
      const availableColors = sortedColors.slice(0, 5);
      
      // Start with an empty array that we'll fill with either locked or new colors
      const newPalette = Array(5).fill(null);
      
      // First, place all locked colors at their original positions
      Object.entries(lockedColors).forEach(([index, color]) => {
        if (color) {
          newPalette[parseInt(index, 10)] = color;
        }
      });
      
      // Fill in the remaining slots with new colors
      let newColorIndex = 0;
      for (let i = 0; i < newPalette.length; i++) {
        // Skip positions that already have a locked color
        if (newPalette[i] !== null) continue;
        
        // Add a new color if available
        if (newColorIndex < availableColors.length) {
          newPalette[i] = availableColors[newColorIndex];
          newColorIndex++;
        } else {
          // If we run out of new colors, keep the existing one if any
          if (palette[i]) {
            newPalette[i] = palette[i];
          } else {
            // Fallback to a default color
            newPalette[i] = 'rgb(200,200,200)';
          }
        }
      }
      
      setPalette(newPalette);
      setIsLoading(false);
    };

    img.onerror = () => {
      setError('Failed to load the image.');
      setIsLoading(false);
    };
  };

  const handleRefresh = React.useCallback(() => {
    if (selectedImage) {
      // Show refresh notification
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
      setNotificationType('refresh');
      setShowNotification(true);
      notificationTimeoutRef.current = setTimeout(() => {
        setShowNotification(false);
      }, 1000);

      // Save the current locked colors to ensure they're preserved
      const currentLockedColors = {...lockedColors};
      
      // Extract colors and then ensure locked colors are still preserved
      extractColors(selectedImage);
    }
  }, [selectedImage, lockedColors]);

  const unlockAllColors = () => {
    setLockedColors({});
    setSnackbar({ open: true, message: 'All colors unlocked!' });
  };

  const handleThemeMenuOpen = (event) => {
    setThemeMenu(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenu(null);
  };

  const handleThemeChange = (themeName) => {
    changeTheme(themeName);
    handleThemeMenuClose();
    setSnackbar({ open: true, message: `Theme changed to ${themeName}!` });
  };

  // Add a function to determine luminance of a color to decide text color
  const getContrastText = (color) => {
    // Extract RGB values
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return '#fff';
    
    // Calculate relative luminance
    const r = parseInt(rgb[0]) / 255;
    const g = parseInt(rgb[1]) / 255;
    const b = parseInt(rgb[2]) / 255;
    
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    
    return luminance > 0.5 ? '#000' : '#fff';
  };

  // Add a function to reset the state
  const handleReset = () => {
    // Show remove notification
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setNotificationType('remove');
    setShowNotification(true);
    notificationTimeoutRef.current = setTimeout(() => {
      setShowNotification(false);
    }, 1000);
    
    setSelectedImage(null);
    setPalette([]);
    setLockedColors({});
    setError(null);
    
    // Reset the file input value to allow reselecting the same file
    const fileInput = document.getElementById('image-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Function to export palette as image
  const exportPaletteAsImage = () => {
    if (!palette.length || !selectedImage) return;
    
    // Create a canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set dimensions
    const width = 800;
    const height = 600;
    canvas.width = width;
    canvas.height = height;
    
    // Fill background based on theme
    if (theme.name === 'cyberpunk') {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0a0a16');
      gradient.addColorStop(1, '#14142b');
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5';
    }
    ctx.fillRect(0, 0, width, height);
    
    // Draw border
    if (theme.name === 'cyberpunk') {
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, width - 20, height - 20);
      
      // Add glow effect for cyberpunk
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f0ff';
    } else {
      ctx.strokeStyle = theme.palette.mode === 'dark' ? '#555' : '#ddd';
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, width - 20, height - 20);
    }
    
    // Load and draw original image
    const img = new Image();
    img.src = selectedImage;
    
    img.onload = () => {
      // Calculate image dimensions (max 300px height while maintaining aspect ratio)
      const imgHeight = Math.min(300, img.height);
      const imgWidth = (img.width / img.height) * imgHeight;
      
      // Draw image centered at the top
      const imgX = (width - imgWidth) / 2;
      ctx.drawImage(img, imgX, 40, imgWidth, imgHeight);
      
      // Reset shadow for text
      ctx.shadowBlur = 0;
      
      // Add title
      ctx.font = theme.name === 'cyberpunk' 
        ? 'bold 24px Orbitron, Arial, sans-serif'
        : 'bold 24px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = theme.palette.mode === 'dark' ? '#fff' : '#333';
      ctx.fillText('TONE TREK - COLOR PALETTE', width / 2, 30);
      
      // Palette square size and spacing
      const squareSize = 80;
      const spacing = 20;
      const startX = (width - ((squareSize + spacing) * palette.length - spacing)) / 2;
      const startY = imgHeight + 80;
      
      // Draw color squares
      palette.forEach((color, index) => {
        const x = startX + (squareSize + spacing) * index;
        
        // Draw color square
        ctx.fillStyle = color;
        ctx.fillRect(x, startY, squareSize, squareSize);
        
        // Draw border
        ctx.strokeStyle = theme.palette.mode === 'dark' ? '#555' : '#ddd';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, startY, squareSize, squareSize);
        
        // Determine text color based on background
        const rgb = color.match(/\d+/g);
        const r = parseInt(rgb[0]) / 255;
        const g = parseInt(rgb[1]) / 255;
        const b = parseInt(rgb[2]) / 255;
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const textColor = luminance > 0.5 ? '#000' : '#fff';
        
        // Draw color codes
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = textColor;
        
        // RGB value
        ctx.fillText(color, x + squareSize / 2, startY + squareSize + 20);
        
        // HEX value
        const hex = '#' + color.replace('rgb', '').replace('(', '').replace(')', '').split(',').map(n => parseInt(n).toString(16).padStart(2, '0')).join('').toUpperCase();
        ctx.fillText(hex, x + squareSize / 2, startY + squareSize + 40);
      });
      
      // Add footer with date and app version
      ctx.font = theme.name === 'cyberpunk' 
        ? '12px Orbitron, Arial, sans-serif'
        : '12px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = theme.palette.mode === 'dark' ? '#aaa' : '#777';
      
      const date = new Date().toLocaleDateString();
      ctx.fillText(`Generated on ${date} with ToneTrek ${APP_VERSION}`, width / 2, height - 20);
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `tonetrek-palette-${date.replace(/\//g, '-')}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      });
    };
  };

  // Toggle lock functionality for a color
  const toggleLockColor = (index) => {
    setLockedColors(prev => {
      const newLockedColors = {...prev};
      // If color is currently locked, unlock it
      if (newLockedColors[index]) {
        delete newLockedColors[index];
      } 
      // If color is not locked, lock it
      else {
        newLockedColors[index] = palette[index];
      }
      return newLockedColors;
    });
  };

  // Update the click handler to use the new toggleLockColor function
  const handleColorLockClick = (index) => {
    toggleLockColor(index);
    setSnackbar({ 
      open: true, 
      message: lockedColors[index] ? `Color ${index + 1} unlocked` : `Color ${index + 1} locked` 
    });
  };

  // Modify keyboard shortcut handlers for locking
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Only handle keyboard shortcuts when image is selected
      if (!selectedImage) return;
      
      // Don't trigger shortcuts when typing in form elements
      if (event.target.closest('input, textarea, [contenteditable]')) return;
      
      // Space key to refresh palette
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent scrolling
        handleRefresh();
      }
      
      // Escape key to reset image
      if (event.code === 'Escape') {
        handleReset();
      }
      
      // Number keys 1-5 to toggle lock for each color
      if (palette.length > 0 && event.key >= '1' && event.key <= '5') {
        const index = parseInt(event.key) - 1;
        if (index < palette.length) {
          // Use the same toggle function for consistency
          toggleLockColor(index);
          
          setSnackbar({ 
            open: true, 
            message: lockedColors[index] ? `Color ${index + 1} unlocked` : `Color ${index + 1} locked` 
          });
        }
      }
      
      // Number key 0 to unlock all colors
      if (event.key === '0') {
        unlockAllColors();
      }

      // Ctrl+Shift+D to export palette as image
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault(); // Prevent browser default action
        exportPaletteAsImage();
        setSnackbar({ open: true, message: 'Exporting palette as image...' });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, palette, lockedColors, handleRefresh]); // Added handleRefresh as dependency

  // Fix the button's click handler
  const IconButtonClickHandler = (index) => {
    // Use the same toggle function
    toggleLockColor(index);
    setSnackbar({ 
      open: true, 
      message: lockedColors[index] ? `Color ${index + 1} unlocked` : `Color ${index + 1} locked` 
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Make the app container at least full viewport height
      }}
    >
      {/* Subtle notification indicator with different colors based on action */}
      {showNotification && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: 
              notificationType === 'refresh' 
                ? (theme.name === 'cyberpunk' ? 'rgba(0, 240, 255, 0.7)' : theme.palette.primary.main) 
                : notificationType === 'load'
                  ? (theme.name === 'cyberpunk' ? 'rgba(0, 255, 128, 0.7)' : theme.palette.success.main)
                  : (theme.name === 'cyberpunk' ? 'rgba(255, 50, 50, 0.7)' : theme.palette.error.main),
            zIndex: 9999,
            animation: 'flash 1s ease-out forwards',
            '@keyframes flash': {
              '0%': {
                opacity: 0.9,
                height: '1px',
              },
              '20%': {
                opacity: 1,
                height: '4px',
              },
              '100%': {
                opacity: 0,
                height: '1px',
              },
            },
            boxShadow: 
              notificationType === 'refresh'
                ? (theme.name === 'cyberpunk' ? '0 0 10px rgba(0, 240, 255, 0.8)' : `0 0 5px ${theme.palette.primary.main}`) 
                : notificationType === 'load'
                  ? (theme.name === 'cyberpunk' ? '0 0 10px rgba(0, 255, 128, 0.8)' : `0 0 5px ${theme.palette.success.main}`)
                  : (theme.name === 'cyberpunk' ? '0 0 10px rgba(255, 50, 50, 0.8)' : `0 0 5px ${theme.palette.error.main}`),
          }}
        />
      )}

      <Container maxWidth="md" sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', pb: 0 }}>
        <Box sx={{ 
          mb: 0,
          mt: 2,
          position: 'relative',
          padding: 1,
          borderRadius: theme.name === 'cyberpunk' ? '2px' : '8px',
          border: theme.name === 'cyberpunk' ? '1px solid rgba(0, 240, 255, 0.15)' : 'none',
          boxShadow: theme.name === 'cyberpunk' ? '0 0 10px rgba(0, 0, 255, 0.1)' : 'none',
          bgcolor: 'background.default',
          flexGrow: 1
        }}>
          <IconButton
            onClick={handleThemeMenuOpen}
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              color: theme.palette.primary.main,
              '&:hover': {
                background: theme.name === 'cyberpunk' ? 'rgba(0, 240, 255, 0.1)' : undefined,
              }
            }}
          >
            <ColorLensIcon />
          </IconButton>
          <Menu
            anchorEl={themeMenu}
            open={Boolean(themeMenu)}
            onClose={handleThemeMenuClose}
          >
            {availableThemes.map((themeOption) => (
              <MenuItem 
                key={themeOption.name} 
                onClick={() => handleThemeChange(themeOption.name)}
                selected={currentTheme === themeOption.name}
              >
                <ListItemText>{themeOption.displayName}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
          
          <Box sx={{ transform: 'scale(0.9)', transformOrigin: 'top center', mt: -0.5, mb: -0.5 }}>
            <ToneTrekLogo theme={theme} />
          </Box>
          
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            onChange={handleImageUpload}
          />
          
          <label htmlFor="image-upload">
            <UploadBox 
              sx={{
                display: 'flex', 
                flexDirection: selectedImage ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: selectedImage ? 'center' : 'flex-start',
                p: selectedImage ? 1.5 : 2,
                border: theme.name === 'cyberpunk' 
                  ? '1px dashed rgba(0, 240, 255, 0.3)' 
                  : selectedImage 
                    ? '1px dashed rgba(0, 0, 0, 0.1)'
                    : '2px dashed rgba(0, 0, 0, 0.1)',
                borderRadius: theme.name === 'cyberpunk' ? '2px' : '16px',
                background: theme.name === 'cyberpunk' 
                  ? 'rgba(20, 20, 35, 0.5)' 
                  : theme.palette.mode === 'dark' 
                    ? 'rgba(40, 40, 40, 0.5)'
                    : 'rgba(240, 240, 240, 0.5)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                },
                mt: 2.5,
                mb: 2.5,
                maxHeight: selectedImage ? '60px' : 'auto',
              }}
            >
              <ThemedButton 
                component="span" 
                variant={theme.name === 'cyberpunk' ? 'outlined' : 'contained'} 
                color="primary"
                sx={{
                  width: selectedImage ? '32px' : '50px',
                  height: selectedImage ? '32px' : '50px',
                  minWidth: selectedImage ? '32px' : '50px',
                }}
              >
                <UploadIcon theme={theme} />
              </ThemedButton>
              {!selectedImage && (
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mt: 1,
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.text.secondary,
                    fontSize: '0.85rem'
                  }}
                >
                  Drop your image here or click to upload
                </Typography>
              )}
              {selectedImage && (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    ml: 1,
                    fontFamily: theme.typography.fontFamily,
                    color: theme.palette.text.secondary,
                    fontSize: '0.75rem'
                  }}
                >
                  Click to change image
                </Typography>
              )}
              {isLoading && (
                <Box sx={{ ml: selectedImage ? 1 : 0, mt: selectedImage ? 0 : 1, display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress size={20} />
                </Box>
              )}
              {error && !selectedImage && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {error}
                </Alert>
              )}
            </UploadBox>
          </label>

          {selectedImage && (
            <Box sx={{ mt: 4, textAlign: 'center', position: 'relative' }}>
              <IconButton
                onClick={handleReset}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bgcolor: 'rgba(0, 0, 0, 0.3)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                  },
                  zIndex: 2,
                  ...(theme.name === 'cyberpunk' && {
                    bgcolor: 'rgba(0, 240, 255, 0.2)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    '&:hover': {
                      bgcolor: 'rgba(0, 240, 255, 0.3)',
                    }
                  })
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <img 
                src={selectedImage} 
                alt="Selected" 
                style={{ maxWidth: '100%', maxHeight: '240px' }}
              />
              {error && (
                <Alert severity="error" sx={{ mt: 1, mx: 'auto', maxWidth: '80%' }}>
                  {error}
                </Alert>
              )}
            </Box>
          )}

          {palette.length > 0 && (
            <>
              <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mt: 3 }}>
                <Tooltip title="Reset Image (ESC)">
                  <IconButton
                    onClick={handleReset}
                    color="default"
                    size="small"
                    sx={{ 
                      backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.container : theme.palette.grey[100],
                      border: theme.name === 'cyberpunk' ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: theme.name === 'cyberpunk' ? '0 0 10px rgba(255, 255, 255, 0.3)' : 'none',
                      }
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Refresh Palette (Space)">
                  <IconButton
                    onClick={handleRefresh}
                    color="primary"
                    size="small"
                    sx={{ 
                      backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.container : theme.palette.grey[100],
                      border: theme.name === 'cyberpunk' ? '1px solid rgba(0, 240, 255, 0.3)' : 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: theme.name === 'cyberpunk' ? '0 0 10px rgba(0, 240, 255, 0.5)' : 'none',
                      }
                    }}
                  >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Unlock All Colors (Press 0)">
                  <IconButton
                    onClick={unlockAllColors}
                    color="secondary"
                    size="small"
                    sx={{ 
                      backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.container : theme.palette.grey[100],
                      border: theme.name === 'cyberpunk' ? '1px solid rgba(255, 0, 160, 0.3)' : 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: theme.name === 'cyberpunk' ? '0 0 10px rgba(255, 0, 160, 0.5)' : 'none',
                      }
                    }}
                  >
                    <LockOpenIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Export Palette (Ctrl+Shift+D)">
                  <IconButton
                    onClick={exportPaletteAsImage}
                    color="info"
                    size="small"
                    sx={{ 
                      backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.container : theme.palette.grey[100],
                      border: theme.name === 'cyberpunk' ? '1px solid rgba(0, 240, 255, 0.3)' : 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: theme.name === 'cyberpunk' ? '0 0 10px rgba(0, 240, 255, 0.5)' : 'none',
                      }
                    }}
                  >
                    <FileDownloadIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <ColorPalette>
                {palette.map((color, index) => (
                  <ColorSwatch 
                    key={index} 
                    color={color} 
                    theme={theme}
                    isLocked={Boolean(lockedColors[index])}
                  >
                    {/* Number indicator - dimmed */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        width: '28px',
                        height: '28px',
                        borderRadius: theme.name === 'cyberpunk' ? '2px' : '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.15)',
                        color: 'rgba(255, 255, 255, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: theme.typography.fontFamily,
                        border: theme.name === 'cyberpunk' 
                          ? '1px solid rgba(255, 255, 255, 0.1)'
                          : 'none',
                        zIndex: 1,
                        backdropFilter: 'blur(1px)',
                      }}
                    >
                      {index + 1}
                    </Box>
                    
                    {/* Lock status overlay */}
                    {lockedColors[index] && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          borderRadius: 'inherit',
                          zIndex: 0,
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            border: theme.name === 'cyberpunk' 
                              ? '2px solid rgba(255, 255, 255, 0.4)' 
                              : '2px solid rgba(255, 255, 255, 0.4)',
                            borderRadius: 'inherit',
                            zIndex: 1,
                          }
                        }}
                      >
                        <LockIcon 
                          sx={{ 
                            fontSize: 32, 
                            color: 'rgba(255, 255, 255, 0.6)', 
                            filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))',
                            ...(theme.name === 'cyberpunk' && {
                              color: 'rgba(0, 240, 255, 0.6)',
                              filter: 'drop-shadow(0 0 4px rgba(0, 240, 255, 0.5))',
                            })
                          }}
                        />
                      </Box>
                    )}
                    
                    <Stack
                      direction="row"
                      spacing={1}
                      className="copy-buttons"
                      sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        opacity: 0,
                        transition: 'opacity 0.2s ease-in-out',
                        zIndex: 2,
                      }}
                    >
                      <Tooltip title={`Lock/Unlock Color (Press ${index + 1})`}>
                        <IconButton
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.3)', 
                            '&:hover': { 
                              bgcolor: theme.name === 'cyberpunk' ? 'rgba(0, 240, 255, 0.5)' : 'rgba(255,255,255,0.5)' 
                            } 
                          }}
                          onClick={() => {
                            toggleLockColor(index);
                          }}
                        >
                          {lockedColors[index] ? 
                            <LockIcon sx={{ fontSize: 16, color: '#fff' }} /> : 
                            <LockOpenIcon sx={{ fontSize: 16, color: '#fff' }} />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Copy RGB">
                        <IconButton
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.3)', 
                            '&:hover': { 
                              bgcolor: theme.name === 'cyberpunk' ? 'rgba(0, 240, 255, 0.5)' : 'rgba(255,255,255,0.5)' 
                            } 
                          }}
                          onClick={() => {
                            navigator.clipboard.writeText(color);
                            setSnackbar({ open: true, message: 'RGB color code copied!' });
                          }}
                        >
                          <FormatColorTextIcon sx={{ fontSize: 16, color: '#fff' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Copy HEX">
                        <IconButton
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.3)', 
                            '&:hover': { 
                              bgcolor: theme.name === 'cyberpunk' ? 'rgba(0, 240, 255, 0.5)' : 'rgba(255,255,255,0.5)' 
                            } 
                          }}
                          onClick={() => {
                            const hex = '#' + color.replace('rgb', '').replace('(', '').replace(')', '').split(',').map(n => parseInt(n).toString(16).padStart(2, '0')).join('');
                            navigator.clipboard.writeText(hex);
                            setSnackbar({ open: true, message: 'HEX color code copied!' });
                          }}
                        >
                          <TagIcon sx={{ fontSize: 16, color: '#fff' }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                    <Box sx={{ textAlign: 'center', mt: 'auto' }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: getContrastText(color),
                          textShadow: theme.name === 'cyberpunk' ? '0 0 2px rgba(0, 0, 0, 0.8)' : '0 0 2px rgba(0,0,0,0.5)',
                          fontWeight: 'bold',
                          display: 'block',
                          fontFamily: theme.typography.fontFamily
                        }}
                      >
                        {color}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: getContrastText(color),
                          textShadow: theme.name === 'cyberpunk' ? '0 0 2px rgba(0, 0, 0, 0.8)' : '0 0 2px rgba(0,0,0,0.5)',
                          opacity: 0.8,
                          display: 'block',
                          fontFamily: theme.typography.fontFamily
                        }}
                      >
                        #{color.replace('rgb', '').replace('(', '').replace(')', '').split(',').map(n => parseInt(n).toString(16).padStart(2, '0')).join('')}
                      </Typography>
                    </Box>
                  </ColorSwatch>
                ))}
              </ColorPalette>
            </>
          )}
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={() => setSnackbar({ open: false, message: '' })}
          message={snackbar.message}
          sx={{
            '& .MuiSnackbarContent-root': {
              backgroundColor: theme.name === 'cyberpunk' ? 'rgba(0, 240, 255, 0.9)' : undefined,
              color: theme.name === 'cyberpunk' ? '#000' : undefined,
              borderRadius: theme.name === 'cyberpunk' ? '2px' : undefined,
              border: theme.name === 'cyberpunk' ? '1px solid rgba(0, 240, 255, 0.5)' : 'none',
              fontFamily: theme.typography.fontFamily,
            }
          }}
        />
      </Container>
      
      <Box sx={{ flexShrink: 0, mt: 1 }}>
        <Footer theme={theme} />
      </Box>
    </Box>
  );
}

export default App;