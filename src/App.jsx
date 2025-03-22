import React, { useState } from 'react';
import { Box, Container, Typography, Button, Paper, IconButton, Stack, Alert, CircularProgress, Tooltip, Snackbar, Menu, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import RefreshIcon from '@mui/icons-material/Refresh';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import TagIcon from '@mui/icons-material/Tag';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { useTheme } from './contexts/ThemeContext';
import { styled } from '@mui/material/styles';

const UploadBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: theme.spacing(4),
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
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  justifyContent: 'center',
  flexWrap: 'wrap',
}));

const ColorSwatch = styled(Box)(({ color, theme, isLocked }) => ({
  width: 100,
  height: 100,
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

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [palette, setPalette] = useState([]);
  const [lockedColors, setLockedColors] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [themeMenu, setThemeMenu] = useState(null);
  const { theme, currentTheme, changeTheme, availableThemes } = useTheme();

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

      const sortedColors = Object.entries(colors)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([color]) => color);

      setPalette(prevPalette => {
        const newPalette = [...sortedColors];
        Object.entries(lockedColors).forEach(([index, color]) => {
          if (color) newPalette[parseInt(index)] = color;
        });
        return newPalette;
      });
      setIsLoading(false);
    };

    img.onerror = () => {
      setError('Failed to load the image.');
      setIsLoading(false);
    };
  };

  const handleRefresh = () => {
    if (selectedImage) {
      extractColors(selectedImage);
    }
  };

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

  return (
    <Container maxWidth="md">
      <Box sx={{ 
        my: 4, 
        position: 'relative',
        padding: 2,
        borderRadius: theme.name === 'cyberpunk' ? '2px' : '8px',
        border: theme.name === 'cyberpunk' ? '1px solid rgba(0, 240, 255, 0.15)' : 'none',
        boxShadow: theme.name === 'cyberpunk' ? '0 0 10px rgba(0, 0, 255, 0.1)' : 'none',
        bgcolor: 'background.default'
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
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            background: (theme) =>
              `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 4,
            textShadow: currentTheme === 'cyberpunk' ? '0 0 8px rgba(0, 240, 255, 0.5)' : 'none',
            fontFamily: theme.typography.fontFamily,
            letterSpacing: theme.name === 'cyberpunk' ? '2px' : 'inherit',
            textTransform: theme.name === 'cyberpunk' ? 'uppercase' : 'none',
          }}
        >
          Color Palette Extractor
        </Typography>
        
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="image-upload"
          onChange={handleImageUpload}
        />
        
        <label htmlFor="image-upload">
          <UploadBox>
            <ThemedButton component="span" variant={theme.name === 'cyberpunk' ? 'outlined' : 'contained'} color="primary">
              Upload Image
            </ThemedButton>
            <Typography 
              variant="body1" 
              sx={{ 
                mt: 2,
                fontFamily: theme.typography.fontFamily
              }}
            >
              {selectedImage ? 'Image selected' : 'Drop your image here or click to upload'}
            </Typography>
            {isLoading && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={24} />
              </Box>
            )}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </UploadBox>
        </label>

        {selectedImage && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <img 
              src={selectedImage} 
              alt="Selected" 
              style={{ maxWidth: '100%', maxHeight: '300px' }} 
            />
          </Box>
        )}

        {palette.length > 0 && (
          <>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
              <IconButton
                onClick={handleRefresh}
                color="primary"
                sx={{ 
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.container : theme.palette.grey[100],
                  border: theme.name === 'cyberpunk' ? '1px solid rgba(0, 240, 255, 0.3)' : 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: theme.name === 'cyberpunk' ? '0 0 10px rgba(0, 240, 255, 0.5)' : 'none',
                  }
                }}
              >
                <RefreshIcon />
              </IconButton>
              <IconButton
                onClick={unlockAllColors}
                color="secondary"
                sx={{ 
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.container : theme.palette.grey[100],
                  border: theme.name === 'cyberpunk' ? '1px solid rgba(255, 0, 160, 0.3)' : 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: theme.name === 'cyberpunk' ? '0 0 10px rgba(255, 0, 160, 0.5)' : 'none',
                  }
                }}
              >
                <LockOpenIcon />
              </IconButton>
            </Stack>
            <ColorPalette>
              {palette.map((color, index) => (
                <ColorSwatch 
                  key={index} 
                  color={color} 
                  theme={theme}
                  isLocked={Boolean(lockedColors[index])}
                >
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
                    }}
                  >
                    <Tooltip title="Lock/Unlock Color">
                      <IconButton
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.3)', 
                          '&:hover': { 
                            bgcolor: theme.name === 'cyberpunk' ? 'rgba(0, 240, 255, 0.5)' : 'rgba(255,255,255,0.5)' 
                          } 
                        }}
                        onClick={() => {
                          setLockedColors(prev => ({
                            ...prev,
                            [index]: prev[index] ? null : color
                          }));
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
  );
}

export default App;