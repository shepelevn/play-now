import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.PG_HOST,
      port: 5432,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      synchronize: false,
      logging: false,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [__dirname + '/migrations/**/*.{js,ts}'],
      ssl: Boolean(process.env.PG_SSL),
      cli: {
        migrationsDir: 'src/migrations',
      },
    };
    // return {
    //   type: 'sqlite',
    //   database: 'data/database.db',
    //   synchronize: false,
    //   logging: false,
    //   entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    //   migrations: [__dirname + '/migrations/**/*.{js,ts}'],
    //   cli: {
    //     migrationsDir: 'src/migrations',
    //   },
    // };
  }
}
