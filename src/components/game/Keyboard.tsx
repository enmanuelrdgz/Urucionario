import { StyleSheet, View } from "react-native"
import DeleteKey from "../home/DeleteKey"
import LetterKey from "./LetterKey"

type Props = {
  onLetterPress: (letter: string) => void,
  onDeletePress: () => void
}

const Keyboard = ({onLetterPress, onDeletePress}: Props) => {
  const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'];

  return (
    <View style={styles.container}>
      {/* Primera fila */}
      <View style={styles.row}>
        {firstRow.map((letter) => (
          <LetterKey key={letter} letter={letter} onPress={onLetterPress} />
        ))}
      </View>
      
      {/* Segunda fila */}
      <View style={styles.row}>
        {secondRow.map((letter) => (
          <LetterKey key={letter} letter={letter} onPress={onLetterPress} />
        ))}
      </View>
      
      {/* Tercera fila */}
      <View style={styles.row}>
        {thirdRow.map((letter) => (
          <LetterKey key={letter} letter={letter} onPress={onLetterPress} />
        ))}
        <DeleteKey onPress={onDeletePress} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
    marginVertical: 3,
  }
})

export default Keyboard