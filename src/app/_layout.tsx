import ReduxProvider from '@/src/redux/ReduxProvider';
import { Slot } from 'expo-router';
import { ImageBackground } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {

  return (
    <ReduxProvider>
      <ImageBackground source={require('@/src/assets/images/background.png')} style={{ flex: 1 }}>
        <Slot/>
      </ImageBackground>
    </ReduxProvider>
  );
}