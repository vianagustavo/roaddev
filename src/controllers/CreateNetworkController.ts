import { Request, Response } from "express";
import { CreateNetworkService } from "../services/CreateNetworkService";

class CreateNetworkController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createNetworkService = new CreateNetworkService();
    const network = await createNetworkService.execute(name);

    return response.json(network);
  }
}

export { CreateNetworkController };
