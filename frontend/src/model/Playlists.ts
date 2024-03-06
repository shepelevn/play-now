import { PlaylistData } from '../types/PlaylistData';
import { ModelStatus } from './ModelStatus';

export default class Playlists {
  public playlists: PlaylistData[] = [];
  public status: ModelStatus = ModelStatus.Pending;

  public removeTrack(playlistId: number, trackId: number): void {
    const playlist: PlaylistData = this.get(playlistId);

    playlist.songs = playlist.songs.filter((song) => song.id !== trackId);
  }

  public get(id: number): PlaylistData {
    const playlist = this.playlists.filter((playlist) => playlist.id === id)[0];

    if (!playlist) {
      throw new Error(`Playlist with id: ${id} not found`);
    }

    return playlist;
  }
}
