import { USERNAME } from '../../api/authConstants';
import TrackComponent from '../../components/trackList/TrackComponent';
import { TrackData } from '../../types/TrackData';

export default class TrackPresenter {
  private trackComponent: TrackComponent;

  constructor(
    private parentElement: HTMLElement,
    private trackData: TrackData,
    likeCallback: () => void,
    dropdownCallback: (event: Event) => void,
  ) {
    const liked: boolean = this.trackData.likes.reduce((accumulator, like) => {
      return accumulator ? accumulator : like.username === USERNAME;
    }, false);

    this.trackComponent = new TrackComponent(
      this.trackData.id,
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
