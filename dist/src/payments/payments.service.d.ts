import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
export declare class PaymentsService {
    private repo;
    constructor(repo: Repository<Payment>);
    create(dto: CreatePaymentDto): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    findOne(id: string): Promise<Payment>;
    update(id: string, dto: UpdatePaymentDto): Promise<Payment>;
    remove(id: string): Promise<void>;
}
