import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
export declare class PaymentsController {
    private readonly svc;
    constructor(svc: PaymentsService);
    findAll(): Promise<import("./payment.entity").Payment[]>;
    findOne(id: string): Promise<import("./payment.entity").Payment>;
    create(dto: CreatePaymentDto): Promise<import("./payment.entity").Payment>;
    update(id: string, dto: UpdatePaymentDto): Promise<import("./payment.entity").Payment>;
    remove(id: string): Promise<void>;
}
