import { USERNAME } from '../../api/authConstants';
import { removeFromPlaylist } from '../../api/playlists';
import { postDislike, postLike } from '../../api/tracks';
import TrackListComponent from '../../components/trackList/TrackListComponent';
import Playlists from '../../model/Playlists';
import Tracks from '../../model/Tracks';
import DropdownService from '../../utils/DropdownService';
import { isTrackLiked } from '../../utils/isTrackLiked';
import { noop } from '../../utils/noop';
import TrackDropdownService from './TrackDropdownService';
import TrackPresenter from './TrackPresenter';

export default class TrackListPresenter {
  private trackListComponent: TrackListComponent;
  private trackDropdownService;
  public onChangeCallback: () => void = noop;

  constructor(
    private parentElement: HTMLElement,
    private dropdownService: DropdownService,
    private tracksModel: Tracks,
    private playlistsModel: Playlists,
  ) {
    this.trackListComponent = new TrackListComponent(tracksModel);

    this.trackDropdownService = new TrackDropdownService(this.dropdownService);
  }

  private createLikeCallback(id: number) {
    let loading = false;

    return async () => {
      if (loading) {
        return;
      } else {
        loading = true;
      }

      const trackData = this.tracksModel.get(id);

      console.log(trackData.id);

      if (!isTrackLiked(trackData)) {
        await postLike(trackData.id);

        trackData.likes.push({ username: USERNAME });
      } else {
        await postDislike(trackData.id);

        trackData.likes = trackData.likes.filter(
          (like) => like.username !== USERNAME,
        );
      }

      this.onChangeCallback();

      loading = false;
    };
  }

  private createDropdownCallback(index: number, deleteCallback: () => void) {
    return (event: Event) => {
      event.stopPropagation();

      const isPlaylist = this.tracksModel.playlistId !== null;

      this.trackDropdownService.openDropdown(index, deleteCallback, isPlaylist);
    };
  }

  private createDeleteCallback(trackId: number): () => void {
    return async () => {
      const playlistId = this.tracksModel.playlistId;

      if (!playlistId) {
        throw new Error('playlistId is null');
      }

      await removeFromPlaylist(playlistId, trackId);

      this.playlistsModel.removeTrack(playlistId, trackId);
      this.tracksModel.setAll(this.playlistsModel.get(playlistId).songs);

      this.onChangeCallback();
    };
  }

  public render() {
    this.trackListComponent.removeElement();
    const trackListElement = this.trackListComponent.getElement();
    this.parentElement.append(trackListElement);

    const trackListUl = document.getElementById('tracks-list');

    if (trackListUl instanceof HTMLElement) {
      for (const trackData of this.tracksModel.allWithSearch()) {
        new TrackPresenter(
          trackListUl,
          trackData,
          this.createLikeCallback(trackData.id),
          this.createDropdownCallback(
            trackData.id,
            this.createDeleteCallback(trackData.id),
          ),
        );
      }
    }
  }
}
