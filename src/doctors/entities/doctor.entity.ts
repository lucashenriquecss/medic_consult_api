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

@Entity('doctors')
export class DoctorEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({unique: true})
    cpf_cnpj: string;
    @Column()
    specialty: string;
    @Column({unique:true})
    crm: string;
    @Column()
    phone: string;
    @Column()
    active: boolean;
    @Column()
    consultation_hours_from: Date;
    @Column()
    consultation_hours_to: Date;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;

    @OneToMany(() => AppointmentEntity, appointment => appointment.doctor)
    appointments: AppointmentEntity[];

}
