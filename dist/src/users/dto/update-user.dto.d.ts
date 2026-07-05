import { CreateUserDto } from './create-user.dto';
export declare class UpdateUserDto implements Partial<CreateUserDto> {
    name?: string;
    email?: string;
    password?: string;
    role?: CreateUserDto['role'];
}
