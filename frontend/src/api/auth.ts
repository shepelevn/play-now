import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookie from 'js-cookie';
import { nanoid } from 'nanoid';

const FIRST_NAME = 'John';
const LAST_NAME = 'Smith';
export let username: string | undefined;

export async function getApiToken(): Promise<string> {
  const credentials = getCredentials();

  username = credentials.username;
  const password = credentials.password;

  try {
    const loginResponse: AxiosResponse = await login(username, password);

    return loginResponse.data.access_token;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      const registerResponse = await register(
        username,
        password,
        FIRST_NAME,
        LAST_NAME,
      );

      return registerResponse.data.access_token;
    } else {
      throw error;
    }
  }
}

function getCredentials(): { username: string; password: string } {
  let username = Cookie.get('username');
  let password = Cookie.get('password');

  if (!username || !password) {
    username = nanoid();
    password = nanoid();

    Cookie.set('username', username);
    Cookie.set('password', password);
  }

  return { username, password };
}

async function register(
  username: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<AxiosResponse> {
  return await axios.post(
    `${window.process.env['API_SERVER_URL']}/auth/register`,
    {
      username,
      password,
      firstName,
      lastName,
    },
  );
}

async function login(
  username: string,
  password: string,
): Promise<AxiosResponse> {
  return await axios.post(
    `${window.process.env['API_SERVER_URL']}/auth/login`,
    {
      username,
      password,
    },
  );
}
