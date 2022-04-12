import { compare, hash } from "bcryptjs";
import { UserRepository } from "../repositories/UserRepositories";

interface IAuthenticateRequest {
  login: string;
  oldPassword: string;
  newPassword: string;
  id: string;
}

class UpdateUserService {
  async execute({ login, oldPassword, newPassword, id }: IAuthenticateRequest) {
    const user = await UserRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    const passwordMatch = await compare(oldPassword, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }
    const passwordHash = await hash(newPassword, 8);
    user.password = passwordHash;
    await UserRepository.save(user);
    return user;
  }
}

export { UpdateUserService };
