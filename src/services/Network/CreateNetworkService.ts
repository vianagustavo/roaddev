import { NetworkRepository } from "../../repositories/NetworkRepositories";

class CreateNetworkService {
  async execute(name: string) {
    if (!name) {
      throw new Error("Incorrect name");
    }

    const networkAlreadyExists = await NetworkRepository.findOne({
      where: { name }
    });
    if (networkAlreadyExists) {
      throw new Error("Network already exists");
    }

    const network = NetworkRepository.create({
      name
    });

    await NetworkRepository.save(network);

    return network;
  }
}

export { CreateNetworkService };
