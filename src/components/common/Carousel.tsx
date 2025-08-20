import RNCarousel, { CarouselRenderItem } from 'react-native-reanimated-carousel';
import { Dimensions } from 'react-native';

const Carousel = <T,>(
  { value, setValue, dec, inc, renderItem, key }:
  { 
    value: T,
    setValue: React.Dispatch<React.SetStateAction<T>>,
    dec: (x: T) => T,
    inc: (x: T) => T,
    renderItem: CarouselRenderItem<T>,
    key: string | number
  }
) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const data: T[] = [dec(value) , value, inc(value)];

  return (
    <RNCarousel
      key={key}
      loop={false}
      width={screenWidth}
      height={screenHeight}
      data={data}
      defaultIndex={1}
      renderItem={renderItem}
      onSnapToItem={(index) => {
        if (index === 0) {
          setValue(dec(value));
        } else if (index === 2) {
          setValue(inc(value));
        }
      }}
    />
  );
}

export default Carousel;