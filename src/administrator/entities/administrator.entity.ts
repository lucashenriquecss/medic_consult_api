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

@Entity('administrators')
export class AdministratorEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    phone: string;
    @Column()
    active: boolean;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;

}
