import { UserRepository } from "../../repositories/UserRepositories";
import { hash } from "bcryptjs";
import { InvalidArgument } from "../../app";
import { IUserRequest } from "../../domain/requestDto";

class CreateUserService {
  async execute({ name, login, loginPassword, admin }: IUserRequest) {
    if (!login) {
      throw new InvalidArgument("Incorrect login");
    }

    const userAlreadyExists = await UserRepository.findOne({
      where: { login }
    });
    if (userAlreadyExists) {
      throw new InvalidArgument("User already exists");
    }
    const passwordHash = await hash(loginPassword, 8);

    const userCreate = UserRepository.create({
      name,
      login,
      password: passwordHash,
      admin
    });

    const user = await UserRepository.save(userCreate);

    const { password, ...newUser } = user;

    return newUser;
  }
}

export { CreateUserService };
