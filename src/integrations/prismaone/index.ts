import axios from "axios";
import { InternalServerError, NotFound } from "../../app";

interface IEnrollmentType {
  enrollment: string;
  status: boolean;
}

interface ITokenResponse {
  token: string;
}

const axiosClient = axios.create({
  baseURL: "http://localhost:4005",
  validateStatus: () => true
});

export async function getToken() {
  const response = await axiosClient.post<ITokenResponse>("/auth/user/login", {
    login: "admin",
    password: "admin"
  });

  if (response.status !== 200) {
    throw new InternalServerError(
      "An internal error has ocurred. Try again later."
    );
  }
  return response.data.token;
}

export async function getEnrollment(enrollment: string) {
  const token = await getToken();
  const response = await axiosClient.get<IEnrollmentType>(
    `/enrollments/${enrollment}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

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
