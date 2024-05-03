import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from 'db/data_source';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
