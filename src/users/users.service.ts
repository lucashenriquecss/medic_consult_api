import { Injectable } from '@nestjs/common';
import { CreatePatientUserDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/common/jwt/crypt';


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
      return await this.userRepository.save(resultCreateUser);
     
    } catch (error) {
      console.log(error)
    }
  }

  async findAll() {
    const resultCreateUser =  this.userRepository.find();
    return resultCreateUser;
  }

  async findOne(id: number) {
    try {
      
      return await this.userRepository.findOne({ where: { id }, relations: ['patient'], });
    } catch (error) {
      console.log(error)
    }
  }
  async findOneEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
