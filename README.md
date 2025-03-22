# ToneTrek

<p align="center">
  <img src="./src/assets/tonetrek-logo.png" alt="ToneTrek Logo" width="300"/>
</p>

ToneTrek is a color palette extraction tool that helps users extract dominant colors from images. Built with React and Material-UI, it provides a modern and responsive interface for color discovery and collection.

## Features

- Extract color palettes from any image
- Lock colors to preserve them when refreshing
- Copy RGB and HEX color codes with one click
- Multiple themes including Cyberpunk, Snow White, and more
- Modern, responsive UI
- Built with React and Material-UI

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Tamujin/ToneTrek.git
   ```

2. Install dependencies
   ```bash
   cd ToneTrek
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser

## How It Works

ToneTrek uses HTML Canvas to analyze images and extract dominant colors:

1. Upload an image (supports JPG, PNG, etc.)
2. The application samples 1000 random pixels from the image
3. The most frequently occurring colors are identified
4. A 5-color palette is generated
5. You can lock specific colors, refresh to find new combinations, or copy color codes

## Development

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Previews the production build locally
- `npm run deploy` - Deploys the app to GitHub Pages

### Version Tracking

ToneTrek follows semantic versioning (MAJOR.MINOR.PATCH):
- Current version: v1.0.0
- Build: 20240322.1

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Bug Reports and Feature Requests

Please use our issue templates when submitting bugs or requesting features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

For security concerns, please review our [Security Policy](SECURITY.md).

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to understand our community standards.

## Acknowledgments

- React
- Material-UI
- Vite

## Contact

Project Link: [https://github.com/Tamujin/ToneTrek](https://github.com/Tamujin/ToneTrek)