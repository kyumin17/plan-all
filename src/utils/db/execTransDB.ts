import SQLite from 'react-native-sqlite-storage';
import { Query } from '../../types/types';

const execTransDB = (
  {
    db,
    queries,
  }: {
    db: SQLite.SQLiteDatabase,
    queries: Query[],
  }
): Promise<{ success: boolean, error: SQLite.SQLError | null }> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        for (const query of queries) {
          tx.executeSql(
            query.query,
            query.params,
            (_tx, res) => {
              
            },
            (_tx, err) => {
              console.error('executeSql 실패', err);
              return true;
            }
          );
        }
      },
      err => {
        console.error('transaction 실패', err);
        resolve({ success: false, error: err });
      },
      () => {
        resolve({ success: true, error: null });
      }
    );
  });
};

export default execTransDB;