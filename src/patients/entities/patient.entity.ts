import { AppointmentEntity } from 'src/appointment/entities/appointment.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Timestamp,
    UpdateDateColumn,
  } from 'typeorm';

@Entity('patients')
export class PatientEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({unique: true})
    cpf: string;
    @Column()
    phone: string;
    @Column()
    date_birth: Date;
    @Column()
    gender: string;
    @Column()
    state: string;
    @Column()
    city: string;
    @Column()
    address: string;
    @Column()
    postal_code: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => UserEntity, user => user.patient)
    @JoinColumn()
    user: UserEntity;
    
    @OneToMany(() => AppointmentEntity, appointment => appointment.patient)
    appointments: AppointmentEntity[];
}

