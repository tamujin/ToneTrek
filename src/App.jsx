import React, { useState } from 'react';
import { Box, Container, Typography, Button, Paper, IconButton, Stack, Alert, CircularProgress, Tooltip, Snackbar } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import RefreshIcon from '@mui/icons-material/Refresh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTheme } from './contexts/ThemeContext';
import { styled } from '@mui/material/styles';

const UploadBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.grey[50],
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

const ColorPalette = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  justifyContent: 'center',
  flexWrap: 'wrap',
}));

const ColorSwatch = styled(Box)(({ color }) => ({
  width: 100,
  height: 100,
  backgroundColor: color,
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  padding: '8px',
  position: 'relative',
  '&:hover .copy-buttons': {
    opacity: 1
  }
}));

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [palette, setPalette] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const { isDark, toggleTheme } = useTheme();

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

      setPalette(sortedColors);
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

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, position: 'relative' }}>
        <IconButton
          onClick={toggleTheme}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            background: (theme) =>
              `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            color: 'transparent',
            mb: 4
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
            <Button component="span" variant="contained" color="primary">
              Upload Image
            </Button>
            <Typography variant="body1" sx={{ mt: 2 }}>
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
                sx={{ backgroundColor: (theme) => theme.palette.grey[100] }}
              >
                <RefreshIcon />
              </IconButton>
            </Stack>
            <ColorPalette>
              {palette.map((color, index) => (
                <ColorSwatch key={index} color={color}>
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
                    <Tooltip title="Copy RGB">
                      <IconButton
                        size="small"
                        sx={{ bgcolor: 'rgba(255,255,255,0.3)', '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' } }}
                        onClick={() => {
                          navigator.clipboard.writeText(color);
                          setSnackbar({ open: true, message: 'RGB color code copied!' });
                        }}
                      >
                        <ContentCopyIcon sx={{ fontSize: 16, color: '#fff' }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Copy HEX">
                      <IconButton
                        size="small"
                        sx={{ bgcolor: 'rgba(255,255,255,0.3)', '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' } }}
                        onClick={() => {
                          const hex = '#' + color.replace('rgb', '').replace('(', '').replace(')', '').split(',').map(n => parseInt(n).toString(16).padStart(2, '0')).join('');
                          navigator.clipboard.writeText(hex);
                          setSnackbar({ open: true, message: 'HEX color code copied!' });
                        }}
                      >
                        <ContentCopyIcon sx={{ fontSize: 16, color: '#fff' }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  <Box sx={{ textAlign: 'center', mt: 'auto' }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#fff',
                        textShadow: '0 0 2px rgba(0,0,0,0.5)',
                        fontWeight: 'bold',
                        display: 'block'
                      }}
                    >
                      {color}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#fff',
                        textShadow: '0 0 2px rgba(0,0,0,0.5)',
                        opacity: 0.8,
                        display: 'block'
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
      />
    </Container>
  );
}

export default App;