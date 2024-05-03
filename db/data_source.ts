import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';
import { UserEntity } from 'src/users/entities/user.entity';
import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { PatientEntity } from 'src/patients/entities/patient.entity';
import { AdministratorEntity } from 'src/administrator/entities/administrator.entity';
import { AppointmentEntity } from 'src/appointment/entities/appointment.entity';

config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserEntity,DoctorEntity,PatientEntity,AdministratorEntity,AppointmentEntity],
  logging: true,
  synchronize: true
};

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize()
  .then(() => {
    console.log('Entidades carregadas:', dataSourceOptions.entities);

    console.log('Conexão com o banco de dados estabelecida com sucesso')
  })
  .catch(error => console.error('Erro ao conectar ao banco de dados:', error));

export default dataSource;