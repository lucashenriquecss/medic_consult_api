import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from 'db/data_source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AdministratorModule } from './administrator/administrator.module';
import { AuthModule } from './auth/auth.module';
import { CronService } from './cron/cron.service';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    DoctorsModule,
    PatientsModule,
    AppointmentModule,
    AdministratorModule,
    AuthModule],
  controllers: [],
  providers: [CronService],
})
export class AppModule {}
