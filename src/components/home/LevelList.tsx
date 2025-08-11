import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { selectLevel } from '@/src/redux/slices/homeSlice';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CategoryIcon from './CategoryIcon';

const CategoryList = () => {

  // un array de obtetos de tipo Category
  const categories = useAppSelector(state => state.data.categories);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { width: screenWidth } = Dimensions.get('window');
  const dispatch = useAppDispatch();
  
  // Configuración de dimensiones
  const levelWidth = screenWidth;
  const levelSpacing = 0;
  const itemSize = levelWidth + levelSpacing;
  
  // Valor animado para trackear scroll
  const scrollX = useRef(new Animated.Value(0)).current;
  // Bandera para evitar loops
  const isScrollingProgramatically = useRef(false);

  useEffect(() => {
    if (scrollViewRef.current && categories.length > 0 && !isScrollingProgramatically.current) {
      isScrollingProgramatically.current = true;
      const scrollPosition = selectedCategoryIndex * itemSize;
      scrollViewRef.current.scrollTo({
        x: scrollPosition,
        animated: true,
      });
      
      // Resetear bandera después de la animación
      setTimeout(() => {
        isScrollingProgramatically.current = false;
      }, 300);
    }
  }, [selectedCategoryIndex, itemSize, categories.length]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } }}],
    {
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isScrollingProgramatically.current) return;
        
        const scrollXValue = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(scrollXValue / itemSize);  // no entiendo este calculo
        const clampedIndex = Math.max(0, Math.min(newIndex, categories.length - 1)); //esto es paraasegurarse de que el índice esté dentro de los límites del array
        
        if (clampedIndex !== selectedCategoryIndex) {
          setSelectedCategoryIndex(clampedIndex);
          dispatch(selectLevel(categories[clampedIndex].id));
        }
      }
    }
  );

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // este codigo esta repetido
    const scrollXValue = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(scrollXValue / itemSize); // no entiendo este calculo
    const clampedIndex = Math.max(0, Math.min(newIndex, categories.length - 1)); //Asegurarse de que el índice esté dentro de los límites del array
    
    if (clampedIndex !== selectedCategoryIndex) {
      setSelectedCategoryIndex(clampedIndex);
      dispatch(selectLevel(categories[clampedIndex].id));
    }
  };

  if (!categories || categories.length === 0) {
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
        snapToInterval={itemSize}
        decelerationRate="fast"
        snapToAlignment="center"
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: 0}
        ]}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
      >
        {categories.map((level, index) => {
          const inputRange = [
            (index - 1) * itemSize,
            index * itemSize,
            (index + 1) * itemSize,
          ];
          
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.1, 0.8],
            extrapolate: 'clamp',
          });
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.levelContainer,
                {
                  width: levelWidth,
                  marginRight: index < categories.length - 1 ? levelSpacing : 0,
                  transform: [{ scale }],
                  opacity,
                }
              ]}
            >
              <CategoryIcon category={level} />
            </Animated.View>
          );
        })}
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
  },
});

export default CategoryList;