
import { AdministratorEntity } from 'src/administrator/entities/administrator.entity';
import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { PatientEntity } from 'src/patients/entities/patient.entity';
import { Roles } from 'src/utils/common/user-roles.enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    username: string;
    @Column({ unique: true })
    email: string;
    @Column()
    password: string;
    @Column({default: [true]})
    active: boolean;

    @Column({ type: 'enum', enum: Roles, default: [Roles.PATIENT] })
    roles: Roles[];
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => PatientEntity, patient => patient.user) 
    patient: PatientEntity;

    @OneToOne(() => AdministratorEntity, administrator => administrator.user) 
    administrator: AdministratorEntity;

    @OneToOne(() => DoctorEntity, doctor => doctor.user) 
    doctor: DoctorEntity;

}
