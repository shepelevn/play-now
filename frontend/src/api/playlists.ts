import axios, { AxiosResponse } from 'axios';
import { PlaylistData } from '../types/PlaylistData';
import { SERVER_URL, USERNAME } from './authConstants';
import { TrackData } from '../types/TrackData';

type PlaylistInfo = {
  id: number;
  name: string;
};

const PLAYLIST_IMAGES_COUNT = 8;

export async function loadPlaylistsData(): Promise<PlaylistData[]> {
  const response: AxiosResponse = await axios.get(
    `${SERVER_URL}/users/${USERNAME}/playlists`,
  );

  const playlistsInfo: PlaylistInfo[] = response.data;

  const playlistsData: PlaylistData[] = await Promise.all(
    playlistsInfo.map(async (playlist, index) => {
      const tracks: TrackData[] = await loadPlaylistTracks(playlist.id);

      const imageId = (index % PLAYLIST_IMAGES_COUNT) + 1;

      return {
        name: playlist.name,
        imageId,
        songs: tracks,
      };
    }),
  );

  return playlistsData;
}

export async function loadPlaylistTracks(id: number): Promise<TrackData[]> {
  const response = await axios.get(`${SERVER_URL}/playlists/${id}`);

  return response.data.songs;
}
