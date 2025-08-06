import ReduxProvider from '@/redux/ReduxProvider';
import { Tabs } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {

  return (
    <ReduxProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: 'none'
          }
        }}
      >
        <Tabs.Screen 
          name="home"
          options={{
            headerShown: false,
            tabBarStyle: {
              display: 'none'
            }
          }}
        />
      </Tabs>
    </ReduxProvider>
  );
}