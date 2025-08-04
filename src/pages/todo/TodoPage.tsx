import CreateButton from '../../components/create_form/button/CreateButton';
import { View, ScrollView } from 'react-native';
import TodoHeader from '../../components/todo/TodoHeader';
import TodoBody from '../../components/todo/TodoBody';

const TodoPage = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView 
        style={{flex: 1}}
      >
        <TodoHeader year={2023} month={10} date={1} />
        <TodoBody />
      </ScrollView>
      <CreateButton link='TodoCreatePage' />
    </View>
  );
};

export default TodoPage;