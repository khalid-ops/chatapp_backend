import { DataSource, DataSourceOptions } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const dbConfig = {
  type: 'mysql',
  entities: ['**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/../db/migrations/',
  },
  synchronize: false,
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      /*
        ssl: {
          ca: fs.readFileSync(process.env.SSL_CA_CERTIFICATES),
        },
        */
    });
    break;
  default:
    throw new Error('unknown environment');
}

export const appDataSource = new DataSource(dbConfig as DataSourceOptions);
