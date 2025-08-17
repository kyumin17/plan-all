import AsyncStorage from '@react-native-async-storage/async-storage';
import saveHoliday from './holiday';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

const isFirstRun = async () => {
  try {
    const isAlreadyRun = await AsyncStorage.getItem('alreadyRun');
    return !isAlreadyRun;
  } catch (error) {
    console.error(error);
    return false;
  }
}

const initialSetting = async ({ db }: { db: SQLiteDatabase }) => {
  const isFirst = await isFirstRun();
  if (!isFirst) return;

  try {
    await saveHoliday({ db: db });
    await AsyncStorage.setItem('alreadyRun', 'true');
  } catch (error) {
    console.error(error);
  }
}

export default initialSetting;