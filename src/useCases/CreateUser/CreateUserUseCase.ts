import { UserRepositoryInterface } from '../../repositories/UserRepositoryInterface';
import { CreateUseRequestDTOInterface } from './CreateUserDTO';
import { User } from '../../entities/User';

export class CreateUserUseCase {
    constructor(private userRepositoy: UserRepositoryInterface) {

    }

    async execute(data: CreateUseRequestDTOInterface) {
        const hasUser = await this.userRepositoy.findByEmail(data.email);

        if (hasUser) {
            throw new Error('User already exists.')
        }

        const user = new User(data);

        await this.userRepositoy.save(user);
    }
}