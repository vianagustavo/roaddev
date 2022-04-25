import { InvalidArgument } from "../../app";
import { NetworkRepository } from "../../repositories/NetworkRepositories";

class CreateNetworkService {
  async execute(name: string) {
    if (!name) {
      throw new InvalidArgument("Incorrect name");
    }

    const networkAlreadyExists = await NetworkRepository.findOne({
      where: { name }
    });
    if (networkAlreadyExists) {
      throw new InvalidArgument("Network already exists");
    }

    const network = NetworkRepository.create({
      name
    });

    await NetworkRepository.save(network);

    return network;
  }
}

export { CreateNetworkService };
