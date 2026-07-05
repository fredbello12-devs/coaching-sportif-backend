import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private repo: Repository<Session>,
  ) {}

  async create(dto: CreateSessionDto): Promise<Session> {
    const ent = new Session();
    Object.assign(ent, {
      ...dto,
      date: dto.date ? new Date(dto.date) : undefined,
    });
    return this.repo.save(ent);
  }

  findAll(): Promise<Session[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Session> {
    const s = await this.repo.findOneBy({ id });
    if (!s) throw new NotFoundException('Session not found');
    return s;
  }

  async update(id: string, dto: UpdateSessionDto): Promise<Session> {
    const s = await this.findOne(id);
    if (dto.title) s.title = dto.title;
    if (dto.description) s.description = dto.description;
    if (dto.date) s.date = new Date(dto.date as any);
    if (dto.durationMinutes) s.durationMinutes = dto.durationMinutes;
    return this.repo.save(s);
  }

  async remove(id: string): Promise<void> {
    const s = await this.findOne(id);
    await this.repo.remove(s);
  }
}
