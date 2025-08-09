import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { selectLevel } from '@/src/redux/slices/homeSlice';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View } from 'react-native';
import LevelIcon from './LevelIcon';

const LevelList = () => {
  const selectedCategory = useAppSelector(state => state.home.selectedCategory)
  const levels = useAppSelector(state => state.data.categories)
  const [setselectedLevelPosition, setsetselectedLevelPosition] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { width: screenWidth } = Dimensions.get('window');
  const dispatch = useAppDispatch()
  
  // Configuración de dimensiones ajustada para el nuevo diseño
  const levelWidth = 140;
  const levelSpacing = 70;
  const sideOffset = (screenWidth - levelWidth) / 2;

  useEffect(() => {
    // Centrar el primer nivel al montar el componente
    if (scrollViewRef.current && levels.length > 0) {
      const scrollPosition = setselectedLevelPosition * (levelWidth + levelSpacing);
      scrollViewRef.current.scrollTo({
        x: scrollPosition,
        animated: false
      });
    }
  }, [setselectedLevelPosition, levelWidth, levelSpacing, levels.length]);

  // esta funcion actualiza el selectedLevelPosition
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(scrollX / (levelWidth + levelSpacing));
    const clampedIndex = Math.max(0, Math.min(newIndex, levels.length - 1));
    if (clampedIndex !== setselectedLevelPosition) {
      setsetselectedLevelPosition(clampedIndex);
      dispatch(selectLevel(levels[clampedIndex].id))
    }
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const targetIndex = Math.round(scrollX / (levelWidth + levelSpacing));
    const clampedIndex = Math.max(0, Math.min(targetIndex, levels.length - 1));
    
    // Asegurar que el nivel quede perfectamente centrado
    const targetScrollX = clampedIndex * (levelWidth + levelSpacing);
    scrollViewRef.current?.scrollTo({
      x: targetScrollX,
      animated: true
    });
    setsetselectedLevelPosition(clampedIndex);
    dispatch(selectLevel(levels[clampedIndex].id))
  };

  // Verificar que hay niveles antes de renderizar
  if (!levels || levels.length === 0) {
    return (
      <View>
        <Text style={styles.emptyText}>No hay niveles disponibles</Text>
      </View>
    );
  }

  return (

      <View style={styles.scrollContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={levelWidth + levelSpacing}
          decelerationRate="fast"
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: sideOffset,
            }
          ]}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
        >
          {levels.map((level, index) => (
            <View
              key={index}
              style={[
                styles.levelContainer,
                {
                  width: levelWidth,
                  marginRight: index < levels.length - 1 ? levelSpacing : 0,
                },
                // Efecto de escala para el nivel seleccionado
                index === setselectedLevelPosition && styles.selectedLevelContainer
              ]}
            >
              <LevelIcon category={level} />
              
            </View>
          ))}
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  emptyText: {
    color: '#B0B0C4',
    fontSize: 16,
    fontStyle: 'italic',
  },
  activeIndicator: {
    backgroundColor: '#FFD700',
    borderColor: '#FFA000',
    transform: [{ scale: 1.2 }],
  },
  scrollContainer: {
    position: 'relative',
  },
  scrollContent: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  levelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 0.9 }],
    opacity: 0.7,
  },
  selectedLevelContainer: {
    transform: [{ scale: 1.1 }],
    opacity: 1,
  },

})

export default LevelList;