import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.myapp.checknoteapp',
  appName: 'CheckNoteApp',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000
    }
  }
};

export default config;
