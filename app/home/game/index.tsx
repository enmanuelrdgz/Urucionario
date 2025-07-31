import Keyboard from '@/components/Keyboard';
import LetterBox from '@/components/LetterBox';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addCharacter, removeCharacter } from '@/redux/slices/gameSlice';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function GameScreen() {
  const dispatch = useAppDispatch();
  const correcntMatch = useAppSelector((state) => state.game.correctMatch)
  const wrongMatch = useAppSelector((state) => state.game.wrongMatch)
  const targetWord = useAppSelector((state) => state.game.targetWord)
    const hint = useAppSelector((state) => state.game.hint)
  const currentGuess = useAppSelector((state) => state.game.currentGuess)
  const router = useRouter()

  useEffect(() => {
    if(correcntMatch) {
      setTimeout(() => {router.push("./home/win")}, 1000) // esto debe ser asincrono
    }
  }, [correcntMatch])

  const onLetterPress = (char: string) => {
    dispatch(addCharacter(char))
  }

  const onDeletePress = () => {
    dispatch(removeCharacter())
  }

  if(targetWord == null || currentGuess == null) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <View style={styles.errorContent}>
          <Text style={styles.errorText}>⚠️ Error cargando el juego</Text>
          <Text style={styles.errorSubtext}>Por favor, reinicia la aplicación</Text>
        </View>
      </SafeAreaView>
    )
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
        <View style={styles.wordContainer}>
          {    
          targetWord.map((letter, index) => (
            <LetterBox 
              key={index} 
              letter={currentGuess[index]} 
              win={correcntMatch}
            />
          ))}
        </View>

        {/* Indicador de estado */}
        {wrongMatch && (
          <View style={styles.statusContainer}>
            <Text style={styles.wrongText}>❌ Palabra incorrecta</Text>
          </View>
        )}

        {correcntMatch && (
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