import { USERNAME } from '../../api/apiConstants';
import { TrackData } from '../../types/TrackData';

export function isTrackLiked(trackData: TrackData): boolean {
  for (const like of trackData.likes) {
    if (like.username === USERNAME) {
      return true;
    }
  }

  return false;
}
