import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(email: string, password: string) {
    if (email !== 'client@coachingsportif.sn' || password !== 'password123') {
      throw new UnauthorizedException('Identifiants invalides');
    }

    return {
      access_token: 'demo-jwt-token',
      user: {
        id: 'user-1',
        name: 'Fred Diop',
        email,
      },
    };
  }

  async getProfile() {
    return {
      id: 'user-1',
      name: 'Fred Diop',
      email: 'client@coachingsportif.sn',
    };
  }
}
