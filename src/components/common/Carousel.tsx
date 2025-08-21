import RNCarousel, { CarouselRenderItem } from 'react-native-reanimated-carousel';
import { Dimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const Carousel = <T,>(
  { data, startIndex, renderItem }:
  { 
    data: T[],
    startIndex: number,
    renderItem: CarouselRenderItem<T>,
  }
) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  return (
    <RNCarousel
      key={startIndex}
      loop={false}
      width={screenWidth}
      height={screenHeight - useBottomTabBarHeight()}
      data={data}
      defaultIndex={startIndex}
      renderItem={renderItem}
    />
  );
}

export default Carousel;