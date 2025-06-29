import useDB from './useDB';
import { useState } from 'react';
import { SQLError } from 'react-native-sqlite-storage';

const useFetch = (
  { createCommand, tableName, filter, params }:
  { 
    createCommand: string,
    tableName: string,
    filter: null | string,
    params: any[],
  }
) => {
  const db = useDB();
  const [result, setResult] = useState<null | any>(null);
  const [error, setError] = useState<null | SQLError>(null);

  db?.transaction(tx => {
    tx.executeSql(
      createCommand,
      [],
      () => {
        tx.executeSql(
          `SELECT * FROM ${tableName} ${filter ? `WHERE ${filter}` : ''};`,
          params,
          (tx, res) => {
            setResult(res);
          },
          (tx, error) => {
            setError(error);
          }
        );
      },
      (tx, error) => {
        setError(error);
      }
    );
  });

  return { result, error };
}

export default useFetch;