import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { PatientEntity } from 'src/patients/entities/patient.entity';
import { Roles } from 'src/utils/common/user-roles.enum';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AppointmentService {
  constructor(
   
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,


    
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      const doctor = await this.doctorRepository.findOne({where:{id:createAppointmentDto.doctorId}});
      const patient = await this.patientRepository.findOne({where:{id:createAppointmentDto.patientId}});


      if(!doctor){
        throw new Error('DOCTOR  login is not EXIST');
      }
      if(!patient){
        throw new Error('PATIENT  is not a EXIST');
      }

    const newAppointmentDto: CreateAppointmentDto = {
      status: createAppointmentDto.status,
      patientId: createAppointmentDto.patientId,
      doctorId: createAppointmentDto.doctorId,
      appointment_date: createAppointmentDto.appointment_date,
   
    };
    
    const appointment = this.appointmentRepository.create({
      ...newAppointmentDto,
      doctor: doctor,
      patient: patient,
    });

    return await this.appointmentRepository.save(appointment);
    
  } catch (error) {
    console.log(error)
  }
  }

  async findAll(params){
    const where = {}
    if(params.id) where['id'] = params.id

    if(params.status) where['status'] = params.status
    if(params.doctorId) where['doctorId'] = params.doctorId
    if(params.patientId) where['patientId'] = params.patientId
    
    const resultAppointment =  await this.appointmentRepository.find({where});
    return resultAppointment;
  }

 

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return await this.appointmentRepository.update(id,updateAppointmentDto);
  }

  
}
