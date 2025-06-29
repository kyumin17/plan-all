import useDB from './useDB';
import { useCallback } from 'react';

const usePost = () => {
  const db = useDB();

  const insertData = useCallback(
  async (
  { tableName, fieldNames, fieldValues }:
  { 
    tableName: string,
    fieldNames: string[],
    fieldValues: any[],
  }
  ) => {
    const query = `INSERT INTO ${tableName} (${fieldNames.join(', ')}) VALUES (${fieldNames.map(() => '?').join(', ')})`;

    if (db) {
      try {
        await db.executeSql(query, fieldValues);
      } catch (error: any) {
        console.error(error);
      }
    } else {
      console.error('Database not initialized');
    }
  }, [db]);

  return insertData;
}

export default usePost;