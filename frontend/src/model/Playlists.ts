import { PlaylistData } from '../types/PlaylistData';
import { ModelStatus } from './ModelStatus';

export default class Playlists {
  public playlists: PlaylistData[] = [];
  public status: ModelStatus = ModelStatus.Pending;
}
