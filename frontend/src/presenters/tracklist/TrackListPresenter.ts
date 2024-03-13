import { removeFromPlaylist } from '../../api/playlists';
import TrackListComponent from '../../components/trackList/TrackListComponent';
import PlaylistsModel from '../../model/PlaylistsModel';
import TracksModel from '../../model/TracksModel';
import DropdownService from '../../utils/services/DropdownService';
import { noop } from '../../utils/noop';
import TrackDropdownService from './TrackDropdownService';
import TrackPresenter from './TrackPresenter';
import AddTrackModalService from './AddTrackModalService';
import ModalService from '../../utils/services/ModalService';
import PlayerModel from '../../model/PlayerModel';
import { TracksType } from '../../types/TracksType';
import { TrackDataWithIndex } from '../../types/TracksDataWithIndex';

export default class TrackListPresenter {
  private readonly trackListComponent: TrackListComponent;
  private readonly trackDropdownService;
  private readonly addTrackModalService: AddTrackModalService;
  public onTracksChangeCallback: () => void = noop;
  public createLikeCallback: (trackData: TrackDataWithIndex) => () => void =
    () => noop;

  constructor(
    private readonly parentElement: HTMLElement,
    private readonly tracksModel: TracksModel,
    private readonly playlistsModel: PlaylistsModel,
    private readonly playerModel: PlayerModel,
    dropdownService: DropdownService,
    modalService: ModalService,
  ) {
    this.trackListComponent = new TrackListComponent(tracksModel);

    this.trackDropdownService = new TrackDropdownService(dropdownService);
    this.addTrackModalService = new AddTrackModalService(
      modalService,
      playlistsModel,
      playerModel,
    );
  }

  private createAddModalCallback(id: number): () => void {
    return () => {
      this.addTrackModalService.open(id);
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

      if (
        (this.playerModel.tracksType === TracksType.Playlist &&
          this.playerModel.playlistId === this.tracksModel.playlistId) ||
        this.playerModel.tracksType === this.tracksModel.tracksType
      ) {
        this.playerModel.originalTracks = this.tracksModel.all();
        this.playerModel.track.index--;
        this.playerModel.onTrackListChange();
      }
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
          this.playerModel,
          this.tracksModel,
          this.createLikeCallback(trackData),
          this.createDropdownCallback(
            trackData.id,
            this.createDeleteCallback(trackData.id),
            this.createAddModalCallback(trackData.id),
          ),
        );
      }
    }
  }
}
