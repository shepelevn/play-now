import { ModelStatus } from '../types/ModelStatus';
import { PlaylistData } from '../types/PlaylistData';
import { TrackData } from '../types/TrackData';
import { noop } from '../utils/noop';

export const PLAYLIST_IMAGES_COUNT = 8;

export default class PlaylistsModel {
  public playlists: PlaylistData[] = [];
  public status: ModelStatus = ModelStatus.Pending;
  public onChange: () => void = noop;

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

  public update(id: number, newPlaylist: PlaylistData): void {
    const index = this.playlists.findIndex((playlist) => playlist.id === id);

    this.playlists[index] = newPlaylist;
  }

  public updateTrack(track: TrackData): void {
    for (const playlist of this.playlists) {
      const index: number = playlist.songs.findIndex(
        (song) => song.id === track.id,
      );

      playlist.songs[index] = track;
    }
  }

  public getFilteredForAddition(trackId: number): PlaylistData[] {
    return this.playlists.filter((playlist) => {
      return playlist.songs.filter((song) => song.id === trackId).length === 0;
    });
  }

  public add(newPlaylist: PlaylistData): void {
    this.playlists.push(newPlaylist);
  }

  public delete(id: number): void {
    this.playlists = this.playlists.filter((playlist) => playlist.id !== id);
  }
}
