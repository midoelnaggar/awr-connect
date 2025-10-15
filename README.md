# AWR Connect

A mobile application built with [Expo](https://expo.dev) and React Native.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Physical mobile device (iOS or Android)
- Expo Go app installed on your mobile device

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd awr-connect
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

1. **Start the Expo development server**:
   ```bash
   npm start
   # or
   yarn start
   # or
   npx expo start
   ```

2. **Install Expo Go on your mobile device**:
   - **iOS**: Download [Expo Go](https://apps.apple.com/us/app/expo-go/id982107779) from the App Store
   - **Android**: Download [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) from Google Play Store

3. **Connect your device**:
   - Make sure your mobile device and development machine are connected to the **same Wi-Fi network**
   - Open the Expo Go app on your mobile device

4. **Scan the QR code**:
   - **iOS**: Use the built-in QR scanner in the Expo Go app
   - **Android**: Use the built-in QR scanner in the Expo Go app
   - Scan the QR code displayed in your terminal after running `npm start`

### Troubleshooting

#### Connection Issues
- Ensure both your computer and mobile device are on the same Wi-Fi network
- If the QR code doesn't work, try typing the URL manually in Expo Go
- Check your firewall settings if the connection fails
- Try using tunnel mode by pressing `t` in the terminal after starting Expo

#### Alternative Running Methods
If you're having network issues, you can also:
- Press `a` to open Android emulator (requires Android Studio)
- Press `i` to open iOS simulator (macOS only, requires Xcode)
- Press `w` to open in web browser

### Development

- The app will reload automatically as you make changes to the code
- Shake your device to access the developer menu
- Check the terminal for logs and error messages

### Learn More

- [Expo Documentation](https://docs.expo.dev) - Learn about Expo features and API
- [React Native Documentation](https://reactnative.dev) - Learn about React Native
- [Expo Go](https://expo.dev/client) - More information about the Expo Go app

### Building for Production

To create standalone builds for the app stores:

```bash
# For iOS
npx eas build --platform ios

# For Android
npx eas build --platform android

# For both platforms
npx eas build --platform all
```

Note: Production builds require an Expo account and additional configuration. See [Expo Build Documentation](https://docs.expo.dev/build/introduction/) for more details.