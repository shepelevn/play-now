import axios, { AxiosResponse } from 'axios';
import { SERVER_URL, USERNAME } from './authConstants';
import { ShortTrackData, TrackData } from '../types/TrackData';

export async function loadTracks(): Promise<TrackData[]> {
  const response: AxiosResponse = await axios.get(
    `${SERVER_URL}/songs?search=${''}`,
  );

  console.log('response.data');
  console.log(response.data);

  return response.data;
}

export async function loadFavorites(): Promise<TrackData[]> {
  const likesResponse: AxiosResponse = await axios.get(
    `${SERVER_URL}/users/${USERNAME}/likes`,
  );

  const shortTracks: ShortTrackData[] = likesResponse.data.songLikes;
  const tracks: TrackData[] = [];

  for (const track of shortTracks) {
    tracks.push(await loadTrack(track.id));
  }

  return tracks;
}

async function loadTrack(id: number): Promise<TrackData> {
  const response: AxiosResponse = await axios.get(`${SERVER_URL}/songs/${id}`);

  return response.data;
}
