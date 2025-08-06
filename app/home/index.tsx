import LevelList from '@/components/home/LevelList';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { startGameThunk } from '@/redux/slices/gameSlice';
import { useRouter } from 'expo-router';
import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {

  // hooks
  const dispatch = useAppDispatch();
  const router = useRouter()

  // redux state
  const levels = useAppSelector(state => state.data.levels)
  const selectedLevel = useAppSelector(state => state.home.selectedLevel)
  
  // function to handle play button click
  // It checks if there are unguessed words in the selected level
  // If there are, it dispatches the startGameThunk and navigates to the game
  // screen
  // If there are no unguessed words, it does nothing
  const handlePlayButton = () => {
      if(levels[selectedLevel].unGessedWords.length > 0) {
        dispatch(startGameThunk(selectedLevel));
        router.push("./home/game")
      }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground 
        source={require('@/assets/images/background.png')} 
        style={styles.backgroundImage}
      >        
        <View style={styles.container}>
          
          {/* Level Selection Section */}
          <View style={styles.levelSection}>
            <LevelList/>
          </View>

          {/* Bottom Section with Play Button */}
          <View style={styles.bottomSection}>
            {/* Play Button */}
            <TouchableOpacity
              style={[
                styles.playButton,
              ]}
              onPress={handlePlayButton}
              activeOpacity={0.8}
            >
              <View style={styles.playButtonInner}>
                <Text style={[
                  styles.playButtonText,
                ]}>
                  Jugar
                </Text>
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
    paddingHorizontal: 0,
    paddingBottom: 40,
  },
  levelSection: {
    flex: 1,
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
  playButtonIcon: {
    fontSize: 18,
    marginLeft: 10,
  },
});