import Keyboard from '@/components/game/Keyboard';
import LetterBox from '@/components/game/LetterBox';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addCharacter, removeCharacter, wordGuessedThunk } from '@/redux/slices/gameSlice';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function GameScreen() {
  const dispatch = useAppDispatch();
  const match = useAppSelector((state) => state.game.match)
  const targetWordArray = useAppSelector((state) => state.game.targetWordArray)
  const targetWordLength = useAppSelector((state) => state.game.targetWordLength);
  const currentGuessLength = useAppSelector((state) => state.game.currentGuessLength)
  const hint = useAppSelector((state) => state.game.hint)
  const currentGuessArray = useAppSelector((state) => state.game.currentGuessArray)
  const router = useRouter()

  useEffect(() => {
    if(match) {
      dispatch(wordGuessedThunk()) //guarda el data slice y la database
      setTimeout(() => {router.push("./win")}, 1000) //cambiar a winscreen
    }
  }, [match])

  const onLetterPress = (char: string) => {
    dispatch(addCharacter(char))
  }

  const onDeletePress = () => {
    dispatch(removeCharacter())
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
            <ImageBackground 
              source={require('@/assets/images/background.png')} 
              style={styles.backgroundImage}
            >    
      {/* Header con pista */}
      <View style={styles.header}>
        <Text style={styles.hintText}>{hint}</Text>
      </View>

      {/* Área de juego principal */}
      <View style={styles.gameArea}>

        {/* Letter Boxes */}
        <View style={styles.wordContainer}>
          {    
          targetWordArray.map((_, index: number) => (
            <LetterBox 
              key={index} 
              letter={currentGuessArray[index]} 
              correctMatch={match && targetWordLength == currentGuessLength}
              wrongMatch={!match && targetWordLength == currentGuessLength}
            />
          ))}
        </View>

        {/* Indicador de estado */}
        {!match && (currentGuessLength == targetWordLength) && (
          <View style={styles.statusContainer}>
            <Text style={styles.wrongText}>❌ Palabra incorrecta</Text>
          </View>
        )}

        {match && (currentGuessLength == targetWordLength) && (
          <View style={styles.statusContainer}>
            <Text style={styles.correctText}>🎉 ¡Correcto!</Text>
          </View>
        )}
      </View>

      {/* Teclado */}
        <Keyboard onLetterPress={onLetterPress} onDeletePress={onDeletePress}/>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    borderRadius: 20,
    marginHorizontal: 10,
    height: 110,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  hintLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  hintText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#212529',
    lineHeight: 24,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  wordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  statusContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 20,
  },
  wrongText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc3545',
    textAlign: 'center',
  },
  correctText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#28a745',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  errorContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
});