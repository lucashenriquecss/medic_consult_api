import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.ADMIN)
  @Get()
  async findAll(@Query() params) {
    return this.administratorService.findAll(params);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.ADMIN)
  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateAdminDto: CreateAdministratorDto) {
    return this.administratorService.update(+id, updateAdminDto);
  }

}
