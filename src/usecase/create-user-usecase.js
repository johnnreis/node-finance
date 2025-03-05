import { v4 as uuidv4 } from 'uuid'
import bccrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repository/postgres/create-user-repository'

export class CreateUserUseCase {
    async execute(createUserParams) {
        // TODO: check if email is in use

        const userId = uuidv4()
        const hashedPassword = await bccrypt.hash(createUserParams.password, 10)

        const user = {
            id: userId,
            first_name: createUserParams.first_name,
            last_name: createUserParams.last_name,
            email: createUserParams.email,
            password: hashedPassword,
        }

        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        const createUser = await postgresCreateUserRepository.execute(user)

        return createUser
    }
}
