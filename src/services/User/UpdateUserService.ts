import { compare, hash } from "bcryptjs";
import { InvalidArgument } from "../../app";
import { UserRepository } from "../../repositories/UserRepositories";

interface IAuthenticateRequest {
  login: string;
  oldPassword: string;
  newPassword: string;
  id: string;
}

class UpdateUserService {
  async execute({ oldPassword, newPassword, id }: IAuthenticateRequest) {
    const user = await UserRepository.findOne({
      where: { id },
      select: {
        admin: true,
        id: true,
        login: true,
        name: true,
        password: true
      }
    });

    if (!user) {
      throw new InvalidArgument("Email/Password incorrect");
    }

    const passwordMatch = await compare(oldPassword, user.password);

    if (!passwordMatch) {
      throw new InvalidArgument("Email/Password incorrect");
    }
    const passwordHash = await hash(newPassword, 8);
    user.password = passwordHash;
    await UserRepository.save(user);
    return user;
  }
}

export { UpdateUserService };
