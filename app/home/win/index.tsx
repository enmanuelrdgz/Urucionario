import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { startGameThunk } from '@/redux/slices/gameSlice';
import { useRouter } from 'expo-router';
import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NextWordScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedLevel = useAppSelector(state => state.home.selectedLevel);
  
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground 
        source={require('@/assets/images/background.png')} 
        style={styles.backgroundImage}
      >        
        <View style={styles.container}>
          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => {
                dispatch(startGameThunk(selectedLevel))
                router.push('./game');
              }}
              activeOpacity={0.8}
            >
              <View style={styles.playButtonInner}>
                <Text style={styles.playButtonText}>Siguiente Palabra</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.playButton}
              onPress={() => router.replace('./')}
              activeOpacity={0.8}
            >
              <View style={styles.playButtonInner}>
                <Text style={styles.playButtonText}>Volver al Menú</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  bottomSection: {
    alignItems: 'center',
    paddingTop: 20,
  },
  playButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#45A049',
    transform: [{ scale: 1 }],
  },
  playButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
