import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { RolesGuard } from 'src/utils/common/jwt/roles.guard';
import { JwtAuthGuard } from 'src/utils/common/jwt/jwt-auth.guard';
import { Role } from 'src/utils/common/jwt/roles.decorator';
import { Roles } from 'src/utils/common/user-roles.enum';
import { AppointmentEntity } from './entities/appointment.entity';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.PATIENT,Roles.ADMIN)
  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<AppointmentEntity> {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

}
