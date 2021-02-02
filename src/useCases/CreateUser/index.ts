import { MailTrapMailProvider } from '../../providers/implementations/MailTrapMailProvider';
import { PostgresUserReposioty } from '../../repositories/implementations/PostgresUserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserController } from './CreateUserController';

const mailTrapMailProvider = new MailTrapMailProvider();
const postgresUserReposioty = new PostgresUserReposioty();

const createUserUseCase = new CreateUserUseCase(
    postgresUserReposioty,
    mailTrapMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };