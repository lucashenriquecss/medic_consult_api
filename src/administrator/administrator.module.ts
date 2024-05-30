import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorEntity } from './entities/administrator.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdministratorEntity,UserEntity])],
  controllers: [AdministratorController],
  providers: [AdministratorService],
  exports: [AdministratorService],

})
export class AdministratorModule {}
