import { Injectable } from '@nestjs/common';
import { CreatePatientUserDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/common/jwt/crypt';
import { sendMail } from 'src/utils/send-email';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
   
  ) {}

  async create(createUserDto: CreateUserDto) : Promise<UserEntity> {
    try {
      
      const hashedPassword   = await hashPassword(createUserDto.password);
  
      const newUserDto: CreateUserDto = {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
        roles: createUserDto.roles
      };

      let resultCreateUser =  this.userRepository.create(newUserDto);

      await sendMail({
        to: createUserDto.email,
        subject: 'Medic Consult',
        body: `Olá ${name}, conta  foi realizado com sucesso!`,
      
      });

      return await this.userRepository.save(resultCreateUser);
     
    } catch (error) {
      console.log(error)
    }
  }

  async findAll() {
    const resultCreateUser =  this.userRepository.find();
    return resultCreateUser;
  }

  async findOne(id: number,params) {
    try {
      const where = {}

      if(params.id) where['id'] = id
  
      if(params.username) where['username'] = params.username
      if(params.email) where['email'] = params.email
      if(params.roles) where['roles'] = params.roles

      return await this.userRepository.findOne({ where, relations: ['patient','patient.appointments','doctor', 'doctor.appointments'], });
    } catch (error) {
      console.log(error)
    }
  }
  async findOneEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id,updateUserDto);
  }



}
