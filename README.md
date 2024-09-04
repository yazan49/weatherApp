Weather App
This is a new React Native project using @react-native-community/cli.

Getting Started
Note: Make sure you have completed the React Native - Environment Setup instructions till "Creating a new application" step before proceeding.

Step 1: Start the Metro Server
First, you will need to start Metro, the JavaScript bundler that ships with React Native.

To start Metro, run the following command from the root of your React Native project:

bash
Copy code

# using npm

npm start

# OR using Yarn

yarn start
Step 2: Start Your Application
Let Metro Bundler run in its own terminal. Open a new terminal from the root of your React Native project. Run the following command to start your Android or iOS app:

For Android
bash
Copy code

# using npm

npm run android

# OR using Yarn

yarn android
For iOS
bash
Copy code

# using npm

npm run ios

# OR using Yarn

yarn ios
If everything is set up correctly, you should see your new app running in your Android Emulator or iOS Simulator shortly, provided you have set up your emulator/simulator correctly.

You can also run it directly from within Android Studio and Xcode respectively.

Step 3: Modifying Your App
Now that you have successfully run the app, let's modify it.

Open App.tsx in your text editor of choice and edit some lines.

Features
Search Screen: Enter a city name to fetch weather data.
Details Screen: View detailed weather information and a 5-day forecast.
Charts: Visual representation of weather data over 5 days.
Saved Cities: Save and revisit weather data for your favorite cities.
Installation
To set up and run the app locally, follow these steps:

Clone the Repository

bash
Copy code
git clone https://github.com/yazan49/weatherApp.git
cd weather-app
Install Dependencies

Ensure you have Node.js and React Native CLI installed.

bash
Copy code
npm install
Set Up Environment Variables

Create a .env file in the root of the project and add your API key:

env
Copy code
API_KEY=your_openweathermap_api_key
Run the App

Start the development server and open the app:

bash
Copy code
npx react-native start
npx react-native run-android # for Android
npx react-native run-ios # for iOS
Usage
Open the App: Launch the app on your device/emulator.
Search for a City: Navigate to the Search Screen, enter a city name, and press search.
View Weather Data: Tap on the searched city to see detailed weather information and a 5-day forecast.
Charts and Data: Check the chart and weather details for the next 5 days.
Components
Splash Screen: Initial loading screen.
Home Screen: Displays the search functionality and navigation.
Search Screen: Allows users to input and search for city names.
Details Screen: Shows detailed weather information and a 5-day forecast.
Custom Hooks
useFetchWeatherData
This custom hook manages API requests and state for fetching weather data. It handles:

Fetching current weather and 5-day forecast data.
Managing loading and error states.
Caching results to avoid redundant API calls.
Usage:

typescript
Copy code
const { todayWeather, forecastData, isLoading, error } = useFetchWeatherData(city);
State Management
The app uses Redux for state management. Key slices include:

Weather Slice: Manages weather data, loading, and error states.
API
The app interacts with the OpenWeatherMap API to fetch weather data. The endpoints used are:

Current Weather: https://api.openweathermap.org/data/2.5/weather
5-Day Forecast: https://api.openweathermap.org/data/2.5/forecast
Testing
To run tests, follow these steps:

React Native Website - learn more about React Native.
Getting Started - an overview of React Native and how to set up your environment.
Learn the Basics - a guided tour of the React Native basics.
Blog - read the latest official React Native Blog posts.
@facebook/react-native - the Open Source; GitHub repository for React Native.
