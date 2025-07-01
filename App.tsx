import NavigationBar from './src/components/NavigationBar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { DBProvider } from './src/components/common/DBProvider';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  return (
    <DBProvider>
      <NavigationContainer theme={Theme}>
        <NavigationBar />
      </NavigationContainer>
    </DBProvider>
  );
};

export default App;
