import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TodoHeader from './TodoHeader';
import TodoBody from './TodoBody';
import CreateButton from '../create_form/button/CreateButton';
import { DateProps } from '../../types/types';

const TodoItem = (
  { item }:
  { item: DateProps }
) => {
  return (
    <View style={{flex: 1}}>
      <ScrollView 
        style={{flex: 1}}
      >
        <TodoHeader 
          year={item.year} 
          month={item.month} 
          date={item.date} 
        />
        <TodoBody />
      </ScrollView>
      <CreateButton link='TodoCreatePage' />
    </View>
  );
}

export default TodoItem;