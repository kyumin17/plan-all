import SQLite from 'react-native-sqlite-storage';

const execDB = (
  {
    db,
    query,
    params = []
  }: {
    db: SQLite.SQLiteDatabase,
    query: string,
    params: any[]
  }
): Promise<{ data: SQLite.ResultSet | null, error: SQLite.SQLError | null }> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          query,
          params,
          (_tx, res) => {
            resolve({ data: res, error: null });
          },
          (_tx, err) => {
            console.error('executeSql 실패', err);
            resolve({ data: null, error: err });
            return false;
          }
        );
      },
      err => {
        console.error('transaction 실패', err);
        resolve({ data: null, error: err });
      }
    );
  });
};

export default execDB;