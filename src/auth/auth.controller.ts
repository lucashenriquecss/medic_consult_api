import { Controller,Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../utils/common/jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
  return this.authService.login(body.email,body.password);
 }
}
