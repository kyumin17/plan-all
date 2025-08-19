import AsyncStorage from '@react-native-async-storage/async-storage';
import saveHoliday from './holiday';
import { SQLiteDatabase } from 'react-native-sqlite-storage';
import execTransDB from './db/execTransDB';
import { Query } from '../types/types';

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

  const tableQuery: Query = {
    query: 'INSERT INTO tablegroup (name, is_default) VALUES (?, ?)',
    params: ['시간표', 1]
  }

  try {
    let queries = [...await saveHoliday(), tableQuery];
    const res = await execTransDB({
      db: db,
      queries: queries
    });

    if (res.success) await AsyncStorage.setItem('alreadyRun', 'true');
  } catch (error) {
    console.error(error);
  }
}

export default initialSetting;