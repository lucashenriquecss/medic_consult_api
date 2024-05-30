import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as  crypto from 'crypto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { PatientEntity } from 'src/patients/entities/patient.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { sendMail } from 'src/utils/send-email';
import { dateFormat } from 'src/utils/date-format';
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
        const doctor = await this.doctorRepository.findOne({where:{id:createAppointmentDto.doctorId},relations:['user']});
        const patient = await this.patientRepository.findOne({where:{id:createAppointmentDto.patientId},relations:['user']});


        if(!doctor){
          throw new HttpException('Doctor not exist', HttpStatus.NOT_FOUND);

        }
        if(!patient){
          throw new HttpException('Patient not exist', HttpStatus.NOT_FOUND);
        }

      //  const verify =  await verifyWork({
      //     consultation_hours_from:  await dateFormat('HH:mm:ss',new Date(doctor.consultation_hours_from)),
      //     consultation_hours_to:  await dateFormat('HH:mm:ss',doctor.consultation_hours_to),
      //     appointment_date:  await dateFormat('HH:mm:ss',new Date(createAppointmentDto.appointment_date)),
      //   });

        // if(!verify){
        //   throw new HttpException('Doctor not available', HttpStatus.NOT_ACCEPTABLE);
        // }
      const newAppointmentDto: CreateAppointmentDto = {
        status: createAppointmentDto.status,
        patientId: createAppointmentDto.patientId,
        doctorId: createAppointmentDto.doctorId,
        appointment_date: createAppointmentDto.appointment_date,
        booking_notification:true,
        hash: crypto.createHash('md5').update(`${createAppointmentDto.appointment_date}_${createAppointmentDto.patientId}_${createAppointmentDto.doctorId}`).digest('hex')
    
      };
      
      const appointment = this.appointmentRepository.create({
        ...newAppointmentDto,
        doctor: doctor,
        patient: patient,
      });

      await sendMail({
        to: patient.user.email,
        subject: 'Medic Chat - marcação de consulta',
        body: `Olá ${patient.name}, seu agendamento foi realizado com sucesso! data: ${newAppointmentDto.appointment_date}`,
      });

      await sendMail({
        to: doctor.user.email,
        subject: 'Medic Chat - marcação de consulta',
        body: `Olá ${doctor.name}, possui agendamento novo! data: ${newAppointmentDto.appointment_date}`,
      
      });

      return await this.appointmentRepository.save(appointment);
      
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(params){
    try {
      const where = {}
      if(params.id) where['id'] = params.id

      if(params.status) where['status'] = params.status
      if(params.doctorId) where['doctorId'] = params.doctorId
      if(params.patientId) where['patientId'] = params.patientId
      
      const resultAppointment =  await this.appointmentRepository.find({where,relations:['patient','patient.user','doctor','doctor.user']});
      return resultAppointment;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    
  }

 

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    try {
      
      return await this.appointmentRepository.update(id,updateAppointmentDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);

    }
  }

  
}
async function verifyWork(params) {
  if (params.appointment_date >= params.consultation_hours_from && params.appointment_date <= params.consultation_hours_to) {
      return true;
  } else {
      return false;
  }
}