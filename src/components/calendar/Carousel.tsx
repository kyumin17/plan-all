import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, View, StyleSheet, Dimensions } from 'react-native';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import { useRef, useState } from 'react';
import CalendarModal from './CalendarModal';
import { CalendarProps } from '../../types/types';

const { width } = Dimensions.get('window');

const Carousel = () => {
  const [month, setMonth] = useState<number>(new Date().getMonth() % 12 + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const [eventModalList, setEventModalList] = useState<CalendarProps[]>([]);
  const [selectDate, setSelectDate] = useState<number>(1);

  const scrollRef = useRef<ScrollView>(null);
  const loopRef = useRef<boolean>(false);

  const onScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    if (loopRef.current) {
      loopRef.current = false;
      return;
    }

    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);

    if (index === 1) {
      return;
    } else if (index === 0) {
      if (month === 1) {
        setYear(y => y - 1);
        setMonth(12);
      } else {
        setMonth(m => m - 1);
      }
    } else {
      if (month === 12) {
        setYear(y => y + 1);
        setMonth(1);
      } else {
        setMonth(m => m + 1);
      }
    }

    loopRef.current = true;
    scrollRef.current?.scrollTo({
      x: width,
      y: 0,
      animated: false,
    });
  }

  return (
    <ScrollView
      horizontal
      pagingEnabled
      onMomentumScrollEnd={onScrollEnd}
      showsHorizontalScrollIndicator={false}
      ref={scrollRef}
      contentOffset={{ x: width, y: 0 }}
    >
      {[-1, 0, 1].map((item: number) => {
        let pageMonth = month + item;
        let pageYear = year;

        if (pageMonth < 1) {
          pageYear--; pageMonth = 12;
        } else if (pageMonth > 12) {
          pageYear++; pageMonth = 1;
        }

        return (
          <View 
            style={styles.page}
            key={item}
          >
            <View style={{flex: 1}}>
              <CalendarHeader year={pageYear} setYear={setYear} month={pageMonth} setMonth={setMonth} />
              <CalendarBody 
                year={pageYear} 
                month={pageMonth} 
                setSelectDate={setSelectDate}
                setEventModalList={setEventModalList}
              />
            </View>

            {eventModalList.length !== 0 && 
            <CalendarModal 
              month={month} 
              date={selectDate} 
              day={new Date(year, month, selectDate).getDay()} 
              eventList={eventModalList} 
              setEventList={setEventModalList}
            />}
          </View>
        );
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: width,
    height: '100%',
  }
});

export default Carousel;