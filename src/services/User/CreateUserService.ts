import { UserRepository } from "../../repositories/UserRepositories";
import { hash } from "bcryptjs";
import { InvalidArgument } from "../../app";
import { IUserRequest } from "../../domain/requestDto";
import { User } from "../../entities/User";

type UserWithoutPassword = Omit<User, "password">;

class CreateUserService {
  async execute({ name, login, password, admin }: IUserRequest) {
    if (!login) {
      throw new InvalidArgument("Incorrect login");
    }

    const userAlreadyExists = await UserRepository.findOne({
      where: { login }
    });
    if (userAlreadyExists) {
      throw new InvalidArgument("User already exists");
    }
    const passwordHash = await hash(password, 8);

    const userCreate = UserRepository.create({
      name,
      login,
      password: passwordHash,
      admin
    });

    const user = await UserRepository.save(userCreate);

    const userResponse: UserWithoutPassword = {
      admin: user.admin,
      created_at: user.created_at,
      id: user.id,
      login: user.login,
      name: user.name,
      updated_at: user.updated_at
    };

    return userResponse;
  }
}

export { CreateUserService };
