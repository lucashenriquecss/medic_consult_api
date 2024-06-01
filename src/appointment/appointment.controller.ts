import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpException, HttpStatus } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { RolesGuard } from 'src/utils/common/jwt/roles.guard';
import { JwtAuthGuard } from 'src/utils/common/jwt/jwt-auth.guard';
import { Role } from 'src/utils/common/jwt/roles.decorator';
import { Roles } from 'src/utils/common/user-roles.enum';
import { AppointmentEntity } from './entities/appointment.entity';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@Controller('appointment')
@ApiTags('Appointment')

export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(JwtAuthGuard,RolesGuard)
  
  @Role(Roles.PATIENT,Roles.ADMIN)
  @ApiOperation({ summary: 'Create appointment' })
  @ApiBody({ schema: { type: 'object', properties: {  
      status: {type: 'Status[]'},
     patientId:{ type:'number'},
     doctorId:{ type:'number'},
     appointment_date:{ type:'Date'},
     booking_notification:{type:'boolean'},
     notificatio_before:{type:'boolean'},
     notification_day:{type:'boolean'},
     hash:{type:'string'}, 
    } } })
  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<AppointmentEntity> {

    return this.appointmentService.create(createAppointmentDto);
      
    
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.PATIENT,Roles.ADMIN,Roles.DOCTOR)
  @Get()
  async findAll(@Query() params) {
    return this.appointmentService.findAll(params);
   
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.PATIENT,Roles.ADMIN,Roles.DOCTOR)
  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {

    return this.appointmentService.update(+id, updateAppointmentDto);
    
  }

}
