import { Level } from "@/types/types"
import { getGessedWords, getTotalWords } from "@/utils/utils"
import { Image, StyleSheet, Text, View } from "react-native"

type Prop = {
  level: Level
}

const LevelIcon = ({level}: Prop) => {
  const guessedWords = getGessedWords(level)
  const totalWords = getTotalWords(level)
  const progress = totalWords > 0 ? (guessedWords / totalWords) * 100 : 0
  const isCompleted = progress === 100

  return (
    <View style={styles.container}>
      {/* Imagen flotante del nivel */}
      <View style={[styles.imageContainer]}>
        <Image 
          source={level.image}
          style={styles.levelImage}
          resizeMode="cover"
        />
      </View>

      {/* Nombre del nivel */}
      <View style={[styles.nameContainer]}>
        <Text style={[styles.levelName]}>
          {level.name}
        </Text>
      </View>

      {/* Descripción flotante */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.levelDescription} numberOfLines={2}>
          {level.description}
        </Text>
      </View>

      {/* Barra de progreso flotante */}
      <View style={[styles.progressContainer, isCompleted && styles.completedProgressContainer]}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progress}%` },
              isCompleted && styles.completedProgress
            ]} 
          />
        </View>
        <Text style={[styles.progressText, isCompleted && styles.completedProgressText]}>
          {`${guessedWords}/${totalWords}`}
        </Text>
      </View>

      {/* Porcentaje flotante */}
      <View style={[styles.percentageContainer, isCompleted && styles.completedPercentageContainer]}>
        <Text style={[styles.percentageText, isCompleted && styles.completedText]}>
          {Math.round(progress)}% completado
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    position: 'relative',
    minHeight: 200,
  },
  
  // Imagen flotante
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  levelImage: {
    width: 150,
    height: 150,
  },
  completedOverlay: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFD700',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  completedIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },

  // Nombre flotante
  nameContainer: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 6,
    justifyContent: "center",
    borderRadius: 20,
    marginBottom: 6,
    width: 110,
    height: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  completedNameContainer: {
    backgroundColor: '#4ECDC4',
  },
  levelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  completedLevelName: {
    color: '#FFFFFF',
  },

  // Descripción flotante
  descriptionContainer: {
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: 150,
    justifyContent: "center",
  },
  levelDescription: {
    fontSize: 12,
    color: '#ffffffff',
    textAlign: 'center',
    fontWeight: '500',
  },

  // Progress flotante
  progressContainer: {
    backgroundColor: '#A8E6CF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 6,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  completedProgressContainer: {
    backgroundColor: '#FFE066',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 3,
    minWidth: 2,
  },
  completedProgress: {
    backgroundColor: '#FF6B6B',
  },
  progressText: {
    fontSize: 12,
    color: '#2C3E50',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  completedProgressText: {
    color: '#2C3E50',
  },

  // Porcentaje flotante
  percentageContainer: {
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FFE066',
  },
  completedPercentageContainer: {
    backgroundColor: '#D4EDDA',
    borderColor: '#4ECDC4',
  },
  percentageText: {
    fontSize: 11,
    color: '#856404',
    fontWeight: '600',
    textAlign: 'center',
  },
  completedText: {
    color: '#155724',
    fontWeight: 'bold',
  },
})

export default LevelIcon 