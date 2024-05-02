import axios, { AxiosResponse } from 'axios';
import { API_SERVER_URL } from './apiConstants';
import { TrackData } from '../types/TrackData';
import { ShortTrackData } from '../types/ShortTrackData';
import { username } from './auth';

export async function loadTracks(filterString: string): Promise<TrackData[]> {
  const response: AxiosResponse = await axios.get(
    `${API_SERVER_URL}/songs?search=${filterString}`,
  );

  return response.data;
}

export async function loadFavorites(): Promise<TrackData[]> {
  const likesResponse: AxiosResponse = await axios.get(
    `${API_SERVER_URL}/users/${username}/likes`,
  );

  const shortTracks: ShortTrackData[] = likesResponse.data.songLikes;
  const tracks: TrackData[] = [];

  for (const track of shortTracks) {
    tracks.push(await loadTrack(track.id));
  }

  return tracks;
}

async function loadTrack(id: number): Promise<TrackData> {
  const response: AxiosResponse = await axios.get(
    `${API_SERVER_URL}/songs/${id}`,
  );

  return response.data;
}

export async function postLike(trackId: number): Promise<void> {
  await axios.post(`${API_SERVER_URL}/songs/${trackId}/like`);
}

export async function postDislike(trackId: number): Promise<void> {
  await axios.post(`${API_SERVER_URL}/songs/${trackId}/unlike`);
}
