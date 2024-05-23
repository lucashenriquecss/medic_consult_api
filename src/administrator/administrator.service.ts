import { Injectable } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { AdministratorEntity } from './entities/administrator.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Roles } from 'src/utils/common/user-roles.enum';

@Injectable()
export class AdministratorService {
  constructor(

    @InjectRepository(AdministratorEntity)
    private readonly administratorRepository: Repository<AdministratorEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

  ) { }
  async create(createAdministratorDto: CreateAdministratorDto) {

    try {
      const isValid = await this.userRepository.findOne({ where: { id: createAdministratorDto.userId } });

      if (!isValid && !isValid.roles.includes(Roles.ADMIN)) {
        throw new Error('User  login is not a ADMIN');
      }

      const newAdminDto: CreateAdministratorDto = {
        name: createAdministratorDto.name,
        phone: createAdministratorDto.phone,
        userId: createAdministratorDto.userId
      };


      let resultCreateAdmin = await this.administratorRepository.create({ ...newAdminDto, user: isValid });

      return await this.administratorRepository.save(resultCreateAdmin);
    } catch (error) {
      console.log(error)
    }
  }

  async findAll(params) {
    const where = {}
    if(params.id) where['id'] = params.id

    if(params.name) where['name'] = params.name
    if(params.userId) where['userId'] = params.userId
    if(params.phone) where['phone'] = params.phone
    
    const result =  await this.administratorRepository.find({where});
    return result;
  }

  async update(id: number, updateAdministratorDto: UpdateAdministratorDto) {
    return await this.administratorRepository.update(id,updateAdministratorDto);
  }

 
}
