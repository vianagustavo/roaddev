import { UserRepository } from "../repositories/UserRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  login: string;
  password: string;
  admin?: boolean;
}


class CreateUserService {
  async execute({name, login, password, admin} : IUserRequest) {
    if(!login) {
      throw new Error("Incorrect login");
    }
    
    const userAlreadyExists = await UserRepository.findOne({where: {login}});
    if(userAlreadyExists) {
      throw new Error("User already exists");
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