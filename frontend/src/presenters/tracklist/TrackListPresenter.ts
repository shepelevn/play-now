import TrackListComponent from '../../components/trackList/TrackListComponent';
import Tracks from '../../model/Tracks';
import DropdownService from '../../utils/DropdownService';
import TrackDropdownService from './TrackDropdownService';
import TrackPresenter from './TrackPresenter';

export default class TrackListPresenter {
  private trackListComponent: TrackListComponent;
  private trackDropdownService;

  constructor(
    private parentElement: HTMLElement,
    private dropdownService: DropdownService,
    private tracksModel: Tracks,
  ) {
    this.trackListComponent = new TrackListComponent();

    this.trackDropdownService = new TrackDropdownService(this.dropdownService);
  }

  private createLikeCallback(index: number) {
    return () => {
      const trackData = this.tracksModel.get(index);

      if (trackData === undefined) {
        throw new Error(`trackData with index: ${index} not found`);
      }

      trackData.liked = !trackData.liked;

      this.tracksModel.update(trackData, index);

      this.render();
    };
  }

  private createDropdownCallback(index: number, deleteCallback: () => void) {
    return (event: Event) => {
      event.stopPropagation();

      this.trackDropdownService.openDropdown(index, deleteCallback);
    };
  }

  private createDeleteCallback(index: number): () => void {
    return () => {
      this.tracksModel.delete(index);

      this.render();
    };
  }

  public render() {
    this.trackListComponent.removeElement();
    const trackListElement = this.trackListComponent.getElement();
    this.parentElement.append(trackListElement);

    const trackListUl = document.getElementById('tracks-list');

    if (trackListUl instanceof HTMLElement) {
      for (const trackData of this.tracksModel.all()) {
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
