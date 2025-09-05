import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'my-app', // 🔁 Replace with your app name
  slug: 'my-app', // 🔁 Should match your project folder name
  version: '1.0.0',
  sdkVersion: '53.0.0', // 🔁 Replace with your actual Expo SDK version
  extra: {
    CLERK_PUBLISHABLE_KEY : process.env.CLERK_PUBLISHABLE_KEY,
  },
});
