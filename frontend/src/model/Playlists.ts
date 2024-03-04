import { PlaylistData } from '../types/PlaylistData';

export default class Playlists {
  constructor(private playlists: PlaylistData[]) {}

  public all(): PlaylistData[] {
    return this.playlists;
  }
}
