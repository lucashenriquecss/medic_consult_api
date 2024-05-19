import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserByEmail(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneEmail(email);

    const isValidPassword = await this.comparePasswords(password,user.password);
    if (user && isValidPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  

  async login(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneEmail(email);
    const isValidPassword = await this.comparePasswords(pass,user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }


  

  async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await compare(plainTextPassword, hashedPassword);
  }

}
