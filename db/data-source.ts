import { Client } from '../src/user-client/entities/client.entity';
import * as process from 'node:process';
import * as dotenv from 'dotenv';
import { DataSourceOptions, DataSource } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: +process.env.PORT,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Client],
  migrations: [`dist/migrations/*.js`],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
