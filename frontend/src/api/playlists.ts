import axios, { AxiosResponse } from 'axios';
import { PlaylistData } from '../types/PlaylistData';
import { TrackData } from '../types/TrackData';
import { PLAYLIST_IMAGES_COUNT } from '../model/PlaylistsModel';
import { username } from '../api/auth';

type PlaylistInfo = {
  id: number;
  name: string;
};

export async function loadPlaylistsData(): Promise<PlaylistData[]> {
  const response: AxiosResponse = await axios.get(
    `${window.process.env['API_SERVER_URL']}/users/${username}/playlists`,
  );

  const playlistsInfo: PlaylistInfo[] = response.data;

  const playlistsData: PlaylistData[] = await Promise.all(
    playlistsInfo.map(async (playlist) => {
      const tracks: TrackData[] = await loadPlaylistTracks(playlist.id);

      const imageId = playlist.id % PLAYLIST_IMAGES_COUNT;

      return {
        id: playlist.id,
        name: playlist.name,
        imageId,
        songs: tracks,
      };
    }),
  );

  return playlistsData;
}

export async function loadPlaylistTracks(id: number): Promise<TrackData[]> {
  const response = await axios.get(
    `${window.process.env['API_SERVER_URL']}/playlists/${id}`,
  );

  return response.data.songs;
}

export async function removeFromPlaylist(
  playlistId: number,
  trackId: number,
): Promise<void> {
  await axios.post(
    `${window.process.env['API_SERVER_URL']}/playlists/${playlistId}/remove/${trackId}`,
  );
}

export async function addToPlaylist(
  playlistId: number,
  trackId: number,
): Promise<PlaylistData> {
  const response = await axios.post(
    `${window.process.env['API_SERVER_URL']}/playlists/${playlistId}/add/${trackId}`,
  );

  return response.data;
}

export async function createPlaylist(name: string): Promise<PlaylistData> {
  const response: AxiosResponse = await axios.post(
    `${window.process.env['API_SERVER_URL']}/playlists`,
    {
      name: name,
    },
  );

  const playlist = response.data;
  playlist.songs = [];

  return playlist;
}

export async function deletePlaylist(playlistId: number): Promise<void> {
  await axios.delete(
    `${window.process.env['API_SERVER_URL']}/playlists/${playlistId}`,
  );
}
