import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { PatientEntity } from './entities/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity,UserEntity])],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],

})
export class PatientsModule {}
