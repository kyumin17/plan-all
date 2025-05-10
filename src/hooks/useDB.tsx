import { useEffect, useState } from 'react';
import SQLite from 'react-native-sqlite-storage';

const useDB = () => {
  SQLite.enablePromise(true);

  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

  useEffect(() => {
    const openDB = async () => {
      try {
        const res = await SQLite.openDatabase({
          name: 'schedule.db',
          location: 'default',
          createFromLocation: '~www/schedule.db',
        });

        setDb(res);
      } catch (error) {
        console.error(error);
      }
    };

    openDB();
  }, []);

  return db;
}

export default useDB;