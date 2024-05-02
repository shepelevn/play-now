import { TrackData } from '../../types/TrackData';
import { username } from '../../api/auth';

export function isTrackLiked(trackData: TrackData): boolean {
  for (const like of trackData.likes) {
    if (like.username === username) {
      return true;
    }
  }

  return false;
}
