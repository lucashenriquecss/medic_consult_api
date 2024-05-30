import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException('User  login is not a patient', HttpStatus.NOT_ACCEPTABLE);

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
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    
  }

  async findAll(params) {
    try {
      const where = {}
      if(params.id) where['id'] = params.id
  
      if(params.cpf) where['cpf'] = params.cpf
      if(params.name) where['name'] = params.name
      if(params.city) where['city'] = params.city
      if(params.gender) where['gender'] = params.gender
      if(params.phone) where['phone'] = params.phone
  
      
      const resultPatient =  await this.patientRepository.find({where});
      return resultPatient;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);

    }
   
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    try {
      
      return await this.patientRepository.update(id,updatePatientDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) { //todo verificar se necessario
    return `This action removes a #${id} patient`;
  }
}
