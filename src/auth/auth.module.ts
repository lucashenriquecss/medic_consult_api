import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../utils/common/jwt/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
