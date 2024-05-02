import axios, { AxiosResponse } from 'axios';
import { API_SERVER_URL } from './apiConstants';
import { username } from '../api/auth';

import userAvatarUrl from '../resources/img/user.jpg';

export type ProfileData = {
  avatarUrl: string;
  fullName: string;
};

type UserData = {
  username: string;
  firstName: string;
  lastName: string;
};

export async function getProfileData(): Promise<ProfileData> {
  const response: AxiosResponse = await axios.get(`${API_SERVER_URL}/users`);

  const usersDataArray: UserData[] = response.data;

  const userData: UserData | undefined = usersDataArray.filter((userData) => {
    return userData.username === username;
  })[0];

  if (!userData) {
    throw new Error('User not found in server list');
  }

  const fullName: string =
    userData.firstName + ' ' + userData.lastName.charAt(0) + '.';

  return {
    avatarUrl: userAvatarUrl,
    fullName: fullName,
  };
}
