import NavigationBar from './src/components/NavigationBar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  return (
    <NavigationContainer theme={Theme}>
      <NavigationBar />
    </NavigationContainer>
  );
};

export default App;
