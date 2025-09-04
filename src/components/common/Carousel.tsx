import RNCarousel, { CarouselRenderItem } from 'react-native-reanimated-carousel';
import { Dimensions, View } from 'react-native';
import { memo, useRef, useState } from 'react';

const Carousel = <T,>(
  { data, startIndex, renderItem, onSnapToItem }:
  { 
    data: T[],
    startIndex: number,
    renderItem: CarouselRenderItem<T>,
    onSnapToItem?: (index: number) => void,
  }
) => {
  const { width: screenWidth } = Dimensions.get('window');
  const [height, setHeight] = useState<number>(0);
  const index = useRef<number>(startIndex);
  const isProgressChange = useRef<boolean>(false);

  const handleProgressChange = (offset: number, absolute: number) => {
    if (isProgressChange.current || !onSnapToItem) return;
    const closeIndex = Math.round(absolute);
    if (closeIndex === index.current || closeIndex < 0 || closeIndex > data.length - 1) return;

    onSnapToItem && onSnapToItem(closeIndex);
  }

  const handleSnapToItem = (newIndex: number) => {
    index.current = newIndex;
    isProgressChange.current = false;
    onSnapToItem && onSnapToItem(newIndex);
  }

  return (
    <View 
      style={{ flex: 1 }}
      onLayout={(event) => {
        const { height: newHeight } = event.nativeEvent.layout;
        setHeight(newHeight);
      }}
    >
      {height !== 0 && <RNCarousel
        key={startIndex}
        loop={false}
        width={screenWidth}
        height={height}
        data={data}
        defaultIndex={startIndex}
        renderItem={renderItem}
        onSnapToItem={handleSnapToItem}
        onProgressChange={handleProgressChange}
        windowSize={5}
      />}
    </View>
  );
}

export default memo(Carousel) as typeof Carousel;