import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async register(login: string, password: string) {
    await this.usersService

  }

  async login(login: string, password: string): Promise<TokenDto> {
    const user = await this.usersService.findOne(login);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    const { password: _, ...result } = user;


    return { token: '' };
  }


}
