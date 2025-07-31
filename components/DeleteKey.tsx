import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const DeleteKey = ({onPress}: {onPress: () => void}) => {
  return(
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => {onPress()}}
      activeOpacity={0.7}
    >
      <View style={styles.keyView}>
        <Text style={styles.keyText}>⌫</Text>
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
    backgroundColor: '#dc3545',
    borderWidth: 1,
    borderColor: '#b02a37',
    borderRadius: 8,
    minWidth: 60,
    minHeight: 45,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  keyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  }
})

export default DeleteKey