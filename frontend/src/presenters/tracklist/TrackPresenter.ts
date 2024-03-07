import TrackComponent from '../../components/trackList/TrackComponent';
import { TrackDataWithIndex } from '../../types/TracksDataWithIndex';
import { isTrackLiked } from '../../utils/isTrackLiked';

export default class TrackPresenter {
  private readonly trackComponent: TrackComponent;

  constructor(
    private readonly parentElement: HTMLElement,
    private readonly trackData: TrackDataWithIndex,
    likeCallback: () => void,
    dropdownCallback: (event: Event) => void,
  ) {
    const liked: boolean = isTrackLiked(this.trackData);

    this.trackComponent = new TrackComponent(
      this.trackData.id,
      this.trackData.index,
      this.trackData.image,
      this.trackData.name,
      this.trackData.artist.name,
      this.trackData.album.name,
      new Date(this.trackData.createdAt),
      this.trackData.duration,
      liked,
    );

    this.trackComponent.addOnLikeListener(likeCallback);
    this.trackComponent.addOnDropdownListener(dropdownCallback);

    this.parentElement.append(this.trackComponent.getElement());
  }
}
