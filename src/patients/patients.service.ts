import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Roles } from 'src/utils/common/user-roles.enum';

@Injectable()
export class PatientsService {
  constructor(
   
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    
  ) {}


  async create(createPatientDto: CreatePatientDto) : Promise <PatientEntity> {
    try {
      const isValid = await this.userRepository.findOne({where:{id:createPatientDto.userId}});

    if(!isValid && !isValid.roles.includes(Roles.PATIENT)){
      throw new Error('User  login is not a patient');
    }

    const newPatientDto: CreatePatientDto = {
      cpf: createPatientDto.cpf,
      name: createPatientDto.name,
      phone:createPatientDto.phone,
      date_birth: createPatientDto.date_birth,
      gender:createPatientDto.gender,
      city:createPatientDto.city,
      address:createPatientDto.address,
      state:createPatientDto.state,
      postal_code:createPatientDto.postal_code,
      userId: createPatientDto.userId
    };

    
    let resultCreatePatient =  await this.patientRepository.create({...newPatientDto,user:isValid});

    return await this.patientRepository.save(resultCreatePatient);
    } catch (error) {
      console.log(error)
    }
    
  }

  findAll() {
    return `This action returns all patients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
