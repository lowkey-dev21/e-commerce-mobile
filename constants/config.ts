import Constants from 'expo-constants';

// For local development, use your machine's local IP
// Replace with your server URL when deployed
const LOCAL_IP = '192.168.1.1'; // Update this to your local IP

export const API_BASE_URL =
  Constants.expoConfig?.extra?.apiUrl ?? `http://${LOCAL_IP}:5000/api`;
