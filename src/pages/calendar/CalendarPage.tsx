import { View } from 'react-native';
import CreateButton from '../../components/create_form/button/CreateButton';
import Carousel from '../../components/calendar/Carousel';

const CalendarPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <Carousel />
      <CreateButton link='CalendarCreatePage' />
    </View>
  );
};

export default CalendarPage;