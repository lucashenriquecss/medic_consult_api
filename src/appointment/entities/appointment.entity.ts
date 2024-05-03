import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { PatientEntity } from 'src/patients/entities/patient.entity';
import { AppointmentStatus } from 'src/utils/common/appointment-status.enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Timestamp,
    UpdateDateColumn,
  } from 'typeorm';

@Entity('appointments')
export class AppointmentEntity { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: AppointmentStatus, default: [AppointmentStatus.PENDING] })
    status: AppointmentStatus;

    @Column()
    appointment_date:Date;
    
    @ManyToOne(() => PatientEntity, patient => patient.appointments)
    @JoinColumn()
    patient: PatientEntity;

    @ManyToOne(() => DoctorEntity, doctor => doctor.appointments)
    @JoinColumn()
    doctor: DoctorEntity;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

}


