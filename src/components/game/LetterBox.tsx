import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  letter: string,
  correctMatch: boolean,
  wrongMatch: boolean
}


// precondicion: correct match y wrong match no pueden ser true simultaneamente
const LetterBox = ({letter, correctMatch, wrongMatch}: Props) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (correctMatch) {
      // Animación de éxito - escala y rotación
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [correctMatch, scaleAnim, rotateAnim]);

  const handlePress = () => {
    // Animación al tocar la caja
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const isEmpty = !letter || letter === '';
  const boxStyle = correctMatch ? styles.winBox : (isEmpty ? styles.emptyBox : styles.filledBox);
  const textStyle = correctMatch ? styles.winText : (isEmpty ? styles.emptyText : styles.filledText);

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Animated.View 
        style={[
          styles.container,
          boxStyle,
          {
            transform: [
              { scale: scaleAnim },
              { rotate: rotate }
            ]
          }
        ]}
      >
        <Text style={[styles.letter, textStyle]}>
          {letter.toUpperCase()}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 10, // Completamente circular
    borderWidth: 0,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  emptyBox: {
    backgroundColor: '#ffffff',
  },
  filledBox: {
    backgroundColor: '#ffffff',
  },
  winBox: {
    backgroundColor: '#4caf50',
  },
  letter: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyText: {
    color: 'transparent',
  },
  filledText: {
    color: '#333333',
  },
  winText: {
    color: '#ffffff',
  },
});

export default LetterBox;