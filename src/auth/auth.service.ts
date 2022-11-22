import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const users = [
    {
      userId: 1,
      username: 'admin',
      password: 'admin',
      userType: 'Manager'
    },
    {
      userId: 2,
      username: 'user',
      password: 'user',
      userType: 'Technician'
    },
    {
      userId: 3,
      username: 'user1',
      password: 'user1',
      userType: 'Technician'
    }
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = users.find(user => user.username === username && user.password === password);
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId, userType: user.userType};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}