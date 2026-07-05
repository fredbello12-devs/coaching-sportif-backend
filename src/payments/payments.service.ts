import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private repo: Repository<Payment>,
  ) {}

  async create(dto: CreatePaymentDto): Promise<Payment> {
    const ent = new Payment();
    Object.assign(ent, {
      amount: dto.amount,
      currency: dto.currency || 'EUR',
      userEmail: dto.userEmail,
      status: PaymentStatus.PENDING,
    });
    return this.repo.save(ent);
  }

  findAll(): Promise<Payment[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Payment> {
    const p = await this.repo.findOneBy({ id });
    if (!p) throw new NotFoundException('Payment not found');
    return p;
  }

  async update(id: string, dto: UpdatePaymentDto): Promise<Payment> {
    const p = await this.findOne(id);
    if (dto.amount) p.amount = dto.amount;
    if (dto.currency) p.currency = dto.currency;
    if ((dto as any).status) p.status = (dto as any).status;
    if (dto.userEmail) p.userEmail = dto.userEmail;
    return this.repo.save(p);
  }

  async remove(id: string): Promise<void> {
    const p = await this.findOne(id);
    await this.repo.remove(p);
  }
}
