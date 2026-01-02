# Mobile App Setup Guide

## ✅ What's Been Set Up

Your React Native mobile app is ready to go! Here's what's been configured:

- ✅ Expo project with TypeScript
- ✅ NativeWind (TailwindCSS) configured
- ✅ React Navigation set up
- ✅ Shared data and utilities from web app
- ✅ Basic screens (Home, Event Detail)
- ✅ Components (Header, EventCard)
- ✅ Design tokens matching your web app

## 🚀 Next Steps

### 1. Install Dependencies

Navigate to the mobile-app directory and install dependencies:

```bash
cd mobile-app
npm install
```

**Note**: If you get permission errors, you may need to run this manually in your terminal.

### 2. Start the Development Server

```bash
npm start
```

This will:
- Start the Expo dev server
- Show a QR code you can scan with your phone
- Open options to run on iOS/Android simulators

### 3. Test on Your Device

**Option A: Use Expo Go App (Easiest)**
1. Install "Expo Go" from App Store (iOS) or Play Store (Android)
2. Scan the QR code shown in terminal
3. App will load on your phone!

**Option B: Use Simulator**
- **iOS**: Press `i` in terminal (requires Mac + Xcode)
- **Android**: Press `a` in terminal (requires Android Studio)

### 4. Start Building UI

The app currently has:
- **Home Screen**: Shows list of events
- **Event Detail Screen**: Shows full event details
- **Basic Navigation**: Between screens

You can now:
- Add more screens (Categories, Search, Profile, etc.)
- Enhance existing screens
- Add more components
- Customize styling

## 📁 Project Structure

```
mobile-app/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Header.tsx
│   │   └── EventCard.tsx
│   ├── screens/          # Screen components
│   │   ├── HomeScreen.tsx
│   │   └── EventDetailScreen.tsx
│   ├── navigation/        # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── data/             # Mock data (shared with web)
│   │   └── mockEvents.ts
│   └── utils/            # Utilities (shared with web)
│       ├── dateUtils.ts
│       └── eventUtils.ts
├── App.tsx               # Root component
├── package.json
└── tailwind.config.js    # Design tokens
```

## 🎨 Design System

The app uses the same design tokens as your web app:
- **Colors**: Defined in `tailwind.config.js`
- **Font**: Space Grotesk (needs to be loaded)
- **Spacing**: Consistent with web app
- **Components**: Match web app styling

## 🔧 Common Commands

```bash
npm start          # Start dev server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run in browser
```

## 📝 Notes

- **No Backend Required**: Uses mock data (same as web app)
- **No Accounts Needed**: Can develop and test locally
- **Ready for Backend**: Easy to swap mock data for API calls later
- **Publishing Later**: When UI is ready, follow `MOBILE_APP_PREREQUISITES.md`

## 🐛 Troubleshooting

**Issue**: `npm install` fails with permission errors
- **Solution**: Run manually in your terminal (outside Cursor)

**Issue**: Expo Go can't connect
- **Solution**: Make sure phone and computer are on same WiFi network

**Issue**: TypeScript errors
- **Solution**: Run `npm install` first, then restart TypeScript server

## 🎯 What to Build Next

1. **Search Functionality**: Add search bar to HomeScreen
2. **Filter Pills**: Category filters (like web app)
3. **Sort Dropdown**: Sort by soonest/trending/newest
4. **Category Screens**: Browse by category
5. **City/University Filters**: Filter by location
6. **Saved Events**: Bookmark functionality
7. **Profile Screen**: User settings (placeholder for now)

## 💡 Tips

- Use `expo-image` for optimized images (already imported)
- Use React Navigation for all navigation
- Keep components reusable (like web app)
- Test on real devices early!

---

**Ready to start?** Run `npm install` then `npm start`! 🚀




