import execDB from './execDB';
import SQLite from 'react-native-sqlite-storage';
import { Filter } from '../../types/types';

const selectDB = async <T>(
  { db, tableName, filter }:
  {
    db: SQLite.SQLiteDatabase | null,
    tableName: string,
    filter: Filter<T>,
  }
) => {
  if (!db) {
    console.error('Database connection failed');
    return null;
  }

  try {
    const findKeys = Object.keys(filter.findFilter ?? {});

    const findFilter = findKeys?.length
    ? ` WHERE ${findKeys.map(tag => `${tag} = ?`).join(' AND ')}`
    : '';

    const orderFilter = filter.orderFilter?.length
    ? ` ORDER BY ${filter.orderFilter.join(', ')}` : '';

    const { data, error } = await execDB({
      db: db,
      query: `SELECT * FROM ${tableName}${findFilter}${orderFilter}`,
      params: Object.values(filter.findFilter ?? {})
    });

    if (error) {
      console.error('Error fetching table:', error);
      return null;
    }

    if (!data) return null;

    const newList = [];
    for (let i = 0; i < data.rows.length; i++) {
      const block = data.rows.item(i);
      newList.push(block);
    }
    
    return newList;
  } catch (error) {
    console.error('Error fetching table:', error);

    return null;
  }
}

export default selectDB;