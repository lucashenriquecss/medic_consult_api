import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './entities/appointment.entity';
import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { PatientEntity } from 'src/patients/entities/patient.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity,DoctorEntity,PatientEntity,UserEntity])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService],

})
export class AppointmentModule {}
