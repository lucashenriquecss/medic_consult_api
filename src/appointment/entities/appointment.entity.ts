import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { PatientEntity } from 'src/patients/entities/patient.entity';
import { Status } from 'src/utils/common/appointment-status.enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';

@Entity('appointments')
export class AppointmentEntity { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: Status, default: [Status.PENDING] })
    status: Status[];

    @Column()
    appointment_date:Date;

    @Column()
    hash: string;
    
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    
    @ManyToOne(() => PatientEntity, patient => patient.appointments)
    @JoinColumn()
    patient: PatientEntity;

    @ManyToOne(() => DoctorEntity, doctor => doctor.appointments)
    @JoinColumn()
    doctor: DoctorEntity;
}


