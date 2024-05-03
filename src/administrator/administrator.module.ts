import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorEntity } from './entities/administrator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdministratorEntity])],
  controllers: [AdministratorController],
  providers: [AdministratorService],
  exports: [AdministratorService],

})
export class AdministratorModule {}
