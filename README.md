
# Aora

Aora is a **personal project** I created while learning React Native. It’s a platform where users can upload AI-generated videos with custom thumbnails and share the prompts they used to generate those videos. Users can explore videos shared by others, or upload their own, making Aora a creative space for AI-generated content.

This app was a challenging yet rewarding learning experience, helping me deepen my understanding of mobile development, state management, backend integration, and media handling.

## Features

- **Email Authentication**: Users can sign up and log in using their email.
- **Upload AI-Generated Videos**: Upload videos with custom thumbnails and the prompt used to create the video.
- **Video Gallery**: Explore AI-generated videos uploaded by other users.
- **Appwrite Integration**: Appwrite handles backend functionality like user authentication, video uploads, and storage.
  
## Screenshots

Here are a few screenshots of Aora in action:

<img src="./assets/screenshots/WelcomePage.png" alt="Welcome Screen" width="300"/>
<img src="./assets/screenshots/signIn.png" alt="Login Screen" width="300"/>
<img src="./assets/screenshots/SignUp.png" alt="Sign Up Screen" width="300"/>
<img src="./assets/screenshots/HomePage.png" alt="Home Screen" width="300"/>
<img src="./assets/screenshots/SearchPage.png" alt="Search Screen" width="300"/>
<img src="./assets/screenshots/createPage.png" alt="Upload Screen" width="300"/>
<img src="./assets/screenshots/ProfilePage.png" alt="User Profile Screen" width="300"/>


## Tech Stack

- **Frontend**: React Native, Expo
- **Styling**: NativeWind, TailwindCSS
- **Backend**: Appwrite (authentication, file storage)
- **Navigation**: React Navigation
- **Other Dependencies**:
  - Vector Icons: `@expo/vector-icons`
  - Gesture Handling: `react-native-gesture-handler`
  - Animations: `react-native-reanimated`, `react-native-animatable`
  - Media Handling: `expo-av`, `expo-image-picker`

## Installation and Setup

To set up the project locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [Expo CLI](https://docs.expo.dev/get-started/installation/) installed globally.
- [Appwrite](https://appwrite.io/) backend configured (you can either use your own or follow Appwrite’s docs to set one up).

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/cygnus07/Aora.git
   cd Aora
   ```

2. **Install Dependencies**:

   Install the required packages by running:

   ```bash
   npm install
   ```

3. **Set up Expo**:

   - Install Expo CLI if you don’t have it:
   
     ```bash
     npm install -g expo-cli
     ```

   - Make sure to configure your Expo app to use a compatible SDK version, based on the version mentioned in `package.json`. You can check Expo's [installation guide](https://docs.expo.dev/get-started/installation/) for help.

4. **Set up Appwrite**:

   - Create an Appwrite project or use an existing one.
   - Set up a project with authentication, database, and file storage.
   - Update the Appwrite credentials in the app by configuring your `projectId`, `endpoint`, and any required secrets in the appropriate configuration files.

5. **Run the App**:

   To run the app on your device/emulator, execute one of the following:

   - For Android:
     ```bash
     npm run android
     ```

   - For iOS:
     ```bash
     npm run ios
     ```

   - For Web:
     ```bash
     npm run web
     ```

### Optional - Reset Project:

If you need to reset the project:

```bash
npm run reset-project
```

## Learning Journey

This project marks an important milestone in my development journey. Aora gave me hands-on experience in React Native, mobile UI design, backend integration with Appwrite, and building a smooth media upload feature. It’s the culmination of what I learned over several months and stands as a proud showcase in my portfolio. Working through challenges, from authentication to media handling, has been both educational and fulfilling.

## Future Improvements

- Implement video streaming for smoother playback.
- Add more granular user permissions for content management.
- Integrate social features like likes and comments.

