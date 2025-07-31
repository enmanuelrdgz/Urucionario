import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const LetterKey = ({letter, onPress}: {letter: string, onPress: (letter: string) => void}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => {onPress(letter)}}
      activeOpacity={0.7}
    >
      <View style={styles.keyView}>
        <Text style={styles.keyText}>{letter}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  keyView: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    minWidth: 10,
    minHeight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  keyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
  }
})

export default LetterKey