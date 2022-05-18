import { UserRepository } from "../../repositories/UserRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { InvalidArgument } from "../../app";

export interface IAuthenticateRequest {
  login: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ login, password }: IAuthenticateRequest) {
    const user = await UserRepository.findOne({
      where: { login },
      select: { id: true, password: true }
    });

    if (!user) {
      throw new InvalidArgument("Email/Password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    const token = sign(
      {
        login: user.login
      },
      `${process.env.USER_SECRET}`,
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
