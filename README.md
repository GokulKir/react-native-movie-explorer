# 🎬 React Native Movie Explorer App

A cross-platform mobile application built with **React Native** for a hiring challenge. This app interacts with the **TMDb API** to display a list of popular movies and detailed information for each. It supports both **Android** and **iOS** platforms.

* * *

## 🚀 Features

 *   🔍 Browse popular movies
      
 *   📄 View detailed movie information
     
 *   🧭 Smooth navigation between screens
       
 *   ⚠️ API error handling and loading states
      
 *   🧠 State management using **Context API** and **Redux Toolkit**
     
 *   🎨 Clean and responsive UI with system-adaptive light/dark mode using useColorScheme
   

* * *

## 📱 Screens

### 🔹 MovieListScreen

* *   Displays a list of movies fetched from the TMDb API.
*     
* *   Clickable movie cards navigate to the detail screen.
*     

### 🔹 MovieDetailScreen

* *   Shows movie **title**, **overview**, **release date**, **rating**, and **poster** image.
*     

* * *

## 🧩 Dependencies

```json
{
  "@react-native-masked-view/masked-view": "^0.3.2",
  "@react-navigation/native": "^7.1.8",
  "@react-navigation/stack": "^7.3.1",
  "@reduxjs/toolkit": "^2.8.1",
  "axios": "^1.9.0",
  "react": "19.0.0",
  "react-native": "0.79.2",
  "react-native-dotenv": "^3.4.11",
  "react-native-gesture-handler": "^2.25.0",
  "react-native-reanimated": "^3.17.5",
  "react-native-safe-area-context": "^5.4.0",
  "react-native-screens": "^4.10.0",
  "react-native-vector-icons": "^10.2.0",
  "react-redux": "^9.2.0",
  "redux": "^5.0.1"
}
```

* * *

## 🛠 Getting Started

> **Note:** Ensure you have completed React Native's environment setup guide before proceeding.

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd movie-explorer
```

### Step 2: Install Dependencies

```bash
npm install
# OR
yarn
```

### Step 3: Set Up Environment Variables

1. 1.  Create a .env file in the root directory.
1.     
1. 2.  Add the following to store the TMDb API key and API details:
1.     

```env
API_KEY=your_tmdb_api_key
SECURE_TOKEN=your_secure_token
```

> These keys are used to authenticate requests to the TMDb API securely via the app's API configuration.

### Step 4: Start Metro

```bash
npm start
# OR
yarn start
```

### Step 5: Build and Run Your App

#### Android

```bash
npm run android
# OR
yarn android
```

#### iOS

1. 1.  Install CocoaPods (if not already installed):
1.     

```bash
bundle install
```

1. 2.  Install iOS dependencies:
1.     

```bash
cd ios && bundle exec pod install && cd ..
```

1. 3.  Run the iOS app:
1.     

```bash
npm run ios
# OR
yarn ios
```

* * *

## 📂 Project Structure

```
src/
│
├── components/        # Reusable UI components (e.g., MovieCard, SkeletonLoader)
├── screens/           # App screens (MovieListScreen, MovieDetailScreen)
├── context/           # Context API setup (uses useColorScheme for system theme)
├── store/             # Redux slices and store configuration
├── hooks/             # Custom hooks (e.g., useFetchMovies)
├── styles/            # Common style definitions
└── utils/             # Utility functions and navigation helpers
```

> The context/ directory leverages the Context API with useColorScheme to dynamically adapt the app's theme based on the device's system light/dark mode settings.

* * *

## ✅ Task Completion

* *   Integrated TMDb API to fetch and display movie data
*     
* *   Built responsive movie listing and detail screens
*     
* *   Implemented loading states and error handling
*     
* *   Used both Context API and Redux Toolkit for state management
*     
* *   Supports both Android and iOS
*     
* *   Included light/dark mode using system preference
*     

* * *

## 👏 Congratulations!

You've successfully set up and run the **React Native Movie Explorer App** 🎉  
Now you can start customizing, expanding features, or integrating it into a larger application!

* * *

## 🧰 Troubleshooting

* *   For reload:
*     
*     * *   **Android**: Press R twice or open Dev Menu (Ctrl + M / Cmd + M)
*     *     
*     * *   **iOS**: Press R in Simulator or use Dev Menu (Cmd + D)
*     *     
* *   Refer to the Troubleshooting Guide for common issues.
*     

* * *

## 📚 Learn More

* *   React Native Docs
*     
* *   React Navigation Docs
*     
* *   Redux Toolkit Docs
*     
* *   TMDb API Documentation
*     

* * *
