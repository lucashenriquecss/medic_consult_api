import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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
  @Role(Roles.PATIENT)
  @Post()
  async create(@Body() createPatientDto: CreatePatientDto): Promise<PatientEntity> {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
