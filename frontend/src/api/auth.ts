import axios, { AxiosError, AxiosResponse } from 'axios';
import { SERVER_URL, USERNAME } from './authConstants';

const PASSWORD = 'password';
const FIRST_NAME = 'John';
const LAST_NAME = 'Smith';

export async function getApiToken(): Promise<string> {
  try {
    const loginResponse: AxiosResponse = await login(USERNAME, PASSWORD);

    return loginResponse.data.access_token;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      const registerResponse = await register(
        USERNAME,
        PASSWORD,
        FIRST_NAME,
        LAST_NAME,
      );

      return registerResponse.data.access_token;
    } else {
      throw error;
    }
  }
}

async function register(
  username: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<AxiosResponse> {
  return await axios.post(`${SERVER_URL}/auth/register`, {
    username,
    password,
    firstName,
    lastName,
  });
}

async function login(
  username: string,
  password: string,
): Promise<AxiosResponse> {
  return await axios.post(`${SERVER_URL}/auth/login`, { username, password });
}
