import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Role } from 'src/utils/common/jwt/roles.decorator';
import { Roles } from 'src/utils/common/user-roles.enum';
import { JwtAuthGuard } from 'src/utils/common/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/utils/common/jwt/roles.guard';

@Controller('administrator')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.ADMIN)
  @Post()
  async create(@Body() createAdministratorDto: CreateAdministratorDto) {
    try {
      return this.administratorService.create(createAdministratorDto);
    } catch (error) {
      console.log(error)
    }
  }

}
