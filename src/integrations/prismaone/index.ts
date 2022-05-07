import axios, { AxiosInstance } from "axios";
import { InternalServerError, NotFound } from "../../app";
import { decode, JwtPayload } from "jsonwebtoken";
import { differenceInSeconds } from "date-fns";
import { myCache } from "../../nodeCacheConfig";

export interface IEnrollmentType {
  enrollment: string;
  status: boolean;
}

export interface ITokenResponse {
  token: string;
}
export function buildPrismaOneClient() {
  return axios.create({
    baseURL: "http://localhost:4005",
    validateStatus: () => true
  });
}
export class PrismaOneIntegration {
  constructor(private readonly client: AxiosInstance) {}
  private async getToken() {
    const token: string | undefined = myCache.get("prismaone-authToken");
    if (token) {
      return token;
    }

    const response = await this.client.post<ITokenResponse>(
      "/auth/user/login",
      {
        login: "admin",
        password: "admin"
      }
    );
    if (response.status !== 200) {
      throw new InternalServerError(
        "An internal error has ocurred. Try again later."
      );
    }
    const decodeToken = decode(response.data.token) as JwtPayload;
    const expSeconds = differenceInSeconds(
      (decodeToken.exp as number) * 1000,
      Date.now()
    );
    myCache.set("prismaone-authToken", response.data.token, expSeconds - 120);
    return response.data.token;
  }
  async getEnrollment(enrollment: string) {
    const token = await this.getToken();
    const response = await this.client.get<IEnrollmentType>(
      `/enrollments/${enrollment}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log({ response });
    switch (response.status) {
      case 200:
        break;
      case 401:
        throw new InternalServerError(
          "An internal error has ocurred. Please contact us."
        );
      case 404:
        throw new NotFound("Enrollment not found.");
      default:
        throw new InternalServerError(
          "An internal error has ocurred. Try again later."
        );
    }

    return response.data;
  }
}
