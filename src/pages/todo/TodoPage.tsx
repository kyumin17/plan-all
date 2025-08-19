import CreateButton from '../../components/create_form/button/CreateButton';
import { View, ScrollView } from 'react-native';
import TodoHeader from '../../components/todo/TodoHeader';
import TodoBody from '../../components/todo/TodoBody';
import { useState } from 'react';

const TodoPage = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [date, setDate] = useState<number>(new Date().getDate());

  return (
    <View style={{flex: 1}}>
      <ScrollView 
        style={{flex: 1}}
      >
        <TodoHeader 
          year={year} 
          month={month} 
          date={date} 
        />
        <TodoBody />
      </ScrollView>
      <CreateButton link='TodoCreatePage' />
    </View>
  );
};

export default TodoPage;