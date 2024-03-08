import { USERNAME } from '../../api/apiConstants';
import { removeFromPlaylist } from '../../api/playlists';
import { postDislike, postLike } from '../../api/tracks';
import TrackListComponent from '../../components/trackList/TrackListComponent';
import Playlists from '../../model/Playlists';
import Tracks from '../../model/Tracks';
import DropdownService from '../../utils/services/DropdownService';
import { isTrackLiked } from '../../utils/isTrackLiked';
import { noop } from '../../utils/noop';
import TrackDropdownService from './TrackDropdownService';
import TrackPresenter from './TrackPresenter';
import AddTrackModalService from './AddTrackModalService';
import ModalService from '../../utils/services/ModalService';

export default class TrackListPresenter {
  private readonly trackListComponent: TrackListComponent;
  private readonly trackDropdownService;
  private readonly addTrackModalService: AddTrackModalService;
  public onTracksChangeCallback: () => void = noop;
  public onPlaylistsChangeCallback: () => void = noop;

  constructor(
    private readonly parentElement: HTMLElement,
    private readonly tracksModel: Tracks,
    private readonly playlistsModel: Playlists,
    dropdownService: DropdownService,
    modalService: ModalService,
  ) {
    this.trackListComponent = new TrackListComponent(tracksModel);

    this.trackDropdownService = new TrackDropdownService(dropdownService);
    this.addTrackModalService = new AddTrackModalService(
      modalService,
      playlistsModel,
    );
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

      if (!isTrackLiked(trackData)) {
        await postLike(trackData.id);

        trackData.likes.push({ username: USERNAME });
      } else {
        await postDislike(trackData.id);

        trackData.likes = trackData.likes.filter(
          (like) => like.username !== USERNAME,
        );
      }

      this.onTracksChangeCallback();

      loading = false;
    };
  }

  private createAddModalCallback(id: number): () => void {
    return () => {
      this.addTrackModalService.open(id, this.onPlaylistsChangeCallback);
    };
  }

  private createDropdownCallback(
    id: number,
    deleteCallback: () => void,
    openModalCallback: () => void,
  ): (event: Event) => void {
    return (event: Event) => {
      event.stopPropagation();

      const isPlaylist = this.tracksModel.playlistId !== null;

      this.trackDropdownService.openDropdown(
        id,
        deleteCallback,
        openModalCallback,
        isPlaylist,
      );
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

      this.onTracksChangeCallback();
    };
  }

  public render() {
    this.trackListComponent.removeElement();
    const trackListElement = this.trackListComponent.getElement();
    this.parentElement.append(trackListElement);

    const trackListUl = document.getElementById('tracks-list');

    if (!(trackListUl instanceof HTMLElement)) {
      throw new Error('trackListUl is not an instanceof HTMLElement');
    }

    for (const trackData of this.tracksModel.allWithSearch()) {
      new TrackPresenter(
        trackListUl,
        trackData,
        this.createLikeCallback(trackData.id),
        this.createDropdownCallback(
          trackData.id,
          this.createDeleteCallback(trackData.id),
          this.createAddModalCallback(trackData.id),
        ),
      );
    }
  }
}
