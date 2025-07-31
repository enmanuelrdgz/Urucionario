import ReduxProvider from '@/redux/ReduxProvider';
import { Audio } from 'expo-av';
import { Tabs } from 'expo-router';
import { useEffect, useRef } from 'react';
import 'react-native-reanimated';

export default function RootLayout() {
    const sound = useRef<Audio.Sound | null>(null)

      const playMusic = async () => {
    const { sound: soundObject } = await Audio.Sound.createAsync(
      require('../assets/music.mp3'),
      { shouldPlay: true }
    )
    sound.current = soundObject
  }

  useEffect(() => {
    playMusic()
    return () => {
      if (sound.current) sound.current.unloadAsync()
    }
  }, [])

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