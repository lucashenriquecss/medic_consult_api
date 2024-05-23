import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorEntity } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/utils/common/user-roles.enum';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class DoctorsService {
  constructor(
   
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    
  ) {}
  async create(createDoctorDto: CreateDoctorDto) {
    try {
        const isValid = await this.userRepository.findOne({where:{id:createDoctorDto.userId}});

        if(!isValid && !isValid.roles.includes(Roles.DOCTOR)){
          throw new Error('User  login is not a DOCTOR');
        }

      const newDoctorDto: CreateDoctorDto = {
        cpf_cnpj: createDoctorDto.cpf_cnpj,
        name: createDoctorDto.name,
        phone: createDoctorDto.phone,
        specialty: createDoctorDto.specialty,
        crm: createDoctorDto.crm,
        consultation_hours_from: createDoctorDto.consultation_hours_from,
        consultation_hours_to: createDoctorDto.consultation_hours_to,
        userId: createDoctorDto.userId
      };

      
      let resultCreateDoctor =  await this.doctorRepository.create({...newDoctorDto,user:isValid});

      return await this.doctorRepository.save(resultCreateDoctor);
    } catch (error) {
      console.log(error)
    }
  }

  async findAll(params){
    const where = {}
    if(params.id) where['id'] = params.id

    if(params.crm) where['crm'] = params.crm
    if(params.name) where['name'] = params.name
    if(params.specialty) where['specialty'] = params.specialty
    if(params.phone) where['phone'] = params.phone

    
    const resultDoctor =  await this.doctorRepository.find({where});
    return resultDoctor;
  }


  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return await this.doctorRepository.update(id,updateDoctorDto);
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
