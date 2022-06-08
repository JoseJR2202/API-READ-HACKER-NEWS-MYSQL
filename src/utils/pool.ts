import {Pool as MyPool, PoolOptions, createPool} from 'mysql2/promise';
require('dotenv').config();


export default class Pool {
  private static instance: MyPool;

  private constructor() {}

  public static getInstance(): MyPool {
    if (!Pool.instance) {
      const opt: PoolOptions = {
        uri: process.env.DATABASE_URL,
        connectionLimit: 10,
        queueLimit: 0,
      };
      Pool.instance = createPool(opt);
    }
    return Pool.instance;
  }
}
