import { UserRepositoryInterface } from '../../repositories/UserRepositoryInterface';
import { CreateUseRequestDTOInterface } from './CreateUserDTO';
import { User } from '../../entities/User';
import { MailProviderInterface } from '../../providers/MailProviderInterface';

export class CreateUserUseCase {
    constructor(
        private userRepositoy: UserRepositoryInterface,
        private mailProvider: MailProviderInterface
    ) { }

    async execute(data: CreateUseRequestDTOInterface) {
        const hasUser = await this.userRepositoy.findByEmail(data.email);

        if (hasUser) {
            throw new Error('User already exists.');
        }

        const user = new User(data);

        await this.userRepositoy.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe do Meu App',
                email: 'equipe@meuapp.com'
            },
            subject: 'Seja bem-vindo à plataforma.',
            body: '<p>Você já pode fazer login em nossa plataforma.</p>'
        });
    }
}
