# Redefine Me - Mobile App

React Native mobile app for UK university society event discovery. Built with Expo, TypeScript, and NativeWind (TailwindCSS).

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo Go app on your phone (for testing)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your device:
- **iOS**: Press `i` in the terminal or scan QR code with Camera app
- **Android**: Press `a` in the terminal or scan QR code with Expo Go app

### Development Commands

- `npm start` - Start Expo dev server
- `npm run ios` - Run on iOS simulator (requires Mac)
- `npm run android` - Run on Android emulator (requires Android Studio)
- `npm run web` - Run in web browser

## 📱 Features

- Event discovery feed
- City/university filtering
- Event detail pages
- Category browsing
- Search functionality
- Modern, minimal UI matching web design

## 🏗️ Project Structure

```
mobile-app/
├── src/
│   ├── components/     # Reusable React Native components
│   ├── screens/       # Screen components
│   ├── navigation/    # Navigation setup
│   ├── data/          # Mock data (shared with web)
│   └── utils/         # Utility functions (shared with web)
├── App.tsx            # Root component
└── package.json
```

## 🎨 Design System

- **Font**: Space Grotesk (matches web)
- **Colors**: Same design tokens as web app
- **Styling**: NativeWind (TailwindCSS for React Native)

## 📝 Notes

- Uses shared mock data and utilities from web app
- No backend required for UI development
- Ready for backend integration when needed

## 🔄 Next Steps

1. Build UI screens
2. Set up navigation
3. Test on devices
4. Integrate backend API (when ready)
5. Prepare for App Store/Play Store publishing




