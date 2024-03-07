import { ModelStatus } from '../types/ModelStatus';
import { PlaylistData } from '../types/PlaylistData';

export const PLAYLIST_IMAGES_COUNT = 8;

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

  public update(id: number, newPlaylist: PlaylistData): void {
    console.log(newPlaylist);

    const index = this.playlists.findIndex((playlist) => playlist.id === id);

    const oldPlaylist = this.playlists[index];

    if (!oldPlaylist) {
      throw new Error('oldPlaylist is undefined');
    }

    newPlaylist.imageId = oldPlaylist.imageId;

    this.playlists[index] = newPlaylist;
  }

  public getPlaylistsForAddition(trackId: number): PlaylistData[] {
    return this.playlists.filter((playlist) => {
      return playlist.songs.filter((song) => song.id === trackId).length === 0;
    });
  }

  public add(newPlaylist: PlaylistData): void {
    newPlaylist.imageId =
      ((this.playlists.length - 1) % PLAYLIST_IMAGES_COUNT) + 1;

    this.playlists.push(newPlaylist);
  }

  public delete(id: number): void {
    this.playlists = this.playlists.filter((playlist) => playlist.id !== id);
  }
}
