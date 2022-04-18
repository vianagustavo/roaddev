import { UserRepository } from "../../repositories/UserRepositories";
import { hash } from "bcryptjs";
import { InvalidArgument } from "../../app";

interface IUserRequest {
  name: string;
  login: string;
  password: string;
  admin?: boolean;
}

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

    const user = UserRepository.create({
      name,
      login,
      password: passwordHash,
      admin
    });

    await UserRepository.save(user);

    return user;
  }
}

export { CreateUserService };
