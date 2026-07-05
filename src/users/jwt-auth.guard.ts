import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant');
    }
    const token = authHeader.split(' ')[1];
    try {
      const secret = process.env.JWT_SECRET || 'secretKey';
      const payload = jwt.verify(token, secret);
      request.user = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Token invalide');
    }
  }
}
