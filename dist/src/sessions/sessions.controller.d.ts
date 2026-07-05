import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
export declare class SessionsController {
    private readonly svc;
    constructor(svc: SessionsService);
    findAll(): Promise<import("./session.entity").Session[]>;
    findOne(id: string): Promise<import("./session.entity").Session>;
    create(dto: CreateSessionDto): Promise<import("./session.entity").Session>;
    update(id: string, dto: UpdateSessionDto): Promise<import("./session.entity").Session>;
    remove(id: string): Promise<void>;
}
