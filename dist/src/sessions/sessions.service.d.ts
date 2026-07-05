import { Repository } from 'typeorm';
import { Session } from './session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
export declare class SessionsService {
    private repo;
    constructor(repo: Repository<Session>);
    create(dto: CreateSessionDto): Promise<Session>;
    findAll(): Promise<Session[]>;
    findOne(id: string): Promise<Session>;
    update(id: string, dto: UpdateSessionDto): Promise<Session>;
    remove(id: string): Promise<void>;
}
