import useDB from './useDB';
import { useState } from 'react';
import { SQLError } from 'react-native-sqlite-storage';

const useFetch = (
  { createCommand, dbName, filter, params }:
  { 
    createCommand: string,
    dbName: string,
    filter: null | string,
    params: any[],
  }
) => {
  const db = useDB();
  const [result, setResult] = useState<null | any>(null);
  const [error, setError] = useState<null | SQLError>(null);

  // db?.transaction(tx => {
  //   tx.executeSql(
  //     createCommand,
  //     [],
  //     () => {
  //       tx.executeSql(
  //         `SELECT * FROM ${dbName} ${filter ? `WHERE ${filter}` : ''};`,
  //         params,
  //         (tx, res) => {
  //           setResult(res);
  //         },
  //         (tx, error) => {
  //           setError(error);
  //         }
  //       );
  //     },
  //     (tx, error) => {
  //       setError(error);
  //     }
  //   );
  // });

  return { result, error };
}

export default useFetch;