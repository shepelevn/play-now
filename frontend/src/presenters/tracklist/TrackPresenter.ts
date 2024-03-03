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
    this.trackComponent = new TrackComponent(
      this.trackData.id,
      this.trackData.imageSrc,
      this.trackData.title,
      this.trackData.author,
      this.trackData.album,
      this.trackData.addedDate,
      this.trackData.lengthS,
      this.trackData.liked,
    );

    this.trackComponent.addOnLikeListener(likeCallback);
    this.trackComponent.addOnDropdownListener(dropdownCallback);

    this.parentElement.append(this.trackComponent.getElement());
  }
}
