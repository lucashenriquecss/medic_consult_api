import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/utils/common/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/utils/common/jwt/roles.guard';
import { Roles } from 'src/utils/common/user-roles.enum';
import { Role } from 'src/utils/common/jwt/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  async register(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.ADMIN)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.ADMIN,Roles.PATIENT,Roles.DOCTOR)
  @Get(':id')
  async findOne(@Param('id') id: string, @Query() params) {
    return this.usersService.findOne(+id,params);
  }
  
  @Get(':id')
  async findOneEmail(@Param('id') email: string) {
    return this.usersService.findOneEmail(email);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.ADMIN,Roles.PATIENT,Roles.DOCTOR)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

 
}
