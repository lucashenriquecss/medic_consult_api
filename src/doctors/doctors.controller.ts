import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { JwtAuthGuard } from 'src/utils/common/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/utils/common/jwt/roles.guard';
import { Roles } from 'src/utils/common/user-roles.enum';
import { Role } from 'src/utils/common/jwt/roles.decorator';
import { DoctorEntity } from './entities/doctor.entity';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.ADMIN,Roles.DOCTOR)
  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.ADMIN,Roles.DOCTOR,Roles.PATIENT)
  @Get()
  async findAll(@Query() params): Promise<DoctorEntity[]> {
    return this.doctorsService.findAll(params);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.ADMIN,Roles.DOCTOR)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.doctorsService.remove(+id);
  // }
}
