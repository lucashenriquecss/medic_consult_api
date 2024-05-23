import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientEntity } from './entities/patient.entity';
import { RolesGuard } from 'src/utils/common/jwt/roles.guard';
import { JwtAuthGuard } from 'src/utils/common/jwt/jwt-auth.guard';
import { Role } from 'src/utils/common/jwt/roles.decorator';
import { Roles } from 'src/utils/common/user-roles.enum';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.PATIENT,Roles.ADMIN)
  @Post()
  async create(@Body() createPatientDto: CreatePatientDto): Promise<PatientEntity> {
    return this.patientsService.create(createPatientDto);
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.PATIENT,Roles.ADMIN,Roles.DOCTOR)
  @Get()
  async findAll(@Query()params): Promise<PatientEntity[]> {
    return  this.patientsService.findAll(params);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.PATIENT,Roles.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  // @Delete(':id') Todo// verificar se necessario delete
  // remove(@Param('id') id: string) {
  //   return this.patientsService.remove(+id);
  // }
}
