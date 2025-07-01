import { createContext, useContext, useState, useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const DBContext = createContext<SQLite.SQLiteDatabase | null>(null);

export const DBProvider = ({ children }: { children: React.ReactNode }) => {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

  useEffect(() => {
    const open = async () => {
      try {
        console.log('DB 연결 시도');
        const res = await SQLite.openDatabase({
          name: 'plan.db',
          location: 'default',
        });
        console.log('DB 연결 성공');
        setDb(res);
      } catch (err) {
        console.error('DB 연결 실패', err);
      }
    };
    open();
  }, []);

  return (
    <DBContext.Provider value={db}>
      {children}
    </DBContext.Provider>
  );
};

export const useDB = () => useContext(DBContext);