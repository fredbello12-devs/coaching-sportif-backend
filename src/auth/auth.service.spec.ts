import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

jest.mock('bcryptjs', () => ({
  compare: jest.fn().mockResolvedValue(true),
}));

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = { sign: jest.fn(() => 'mockToken') } as any;
    service = new AuthService({} as any, jwtService);
    (service as any).usersService.findByEmail = jest.fn().mockResolvedValue({
      id: '1',
      email: 'admin@local',
      password: 'hashed',
      role: 'admin',
    });
  });

  it('should generate a JWT token', async () => {
    const result = await service.login('admin@local', 'Admin123!');
    expect(result.access_token).toBeDefined();
    expect(typeof result.access_token).toBe('string');
  });
});
