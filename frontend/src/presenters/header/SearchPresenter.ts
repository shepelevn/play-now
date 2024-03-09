import SearchComponent from '../../components/header/SearchComponent';
import TracksModel from '../../model/TracksModel';
import { noop } from '../../utils/noop';

export default class SearchPresenter {
  private readonly searchComponent: SearchComponent;
  public searchChangeCallback: () => void = noop;

  constructor(
    private readonly parentElement: HTMLElement,
    tracks: TracksModel,
  ) {
    this.searchComponent = new SearchComponent();

    this.parentElement.append(this.searchComponent.getElement());

    this.searchComponent.addOnChange((event: Event) => {
      const input: EventTarget | null = event.currentTarget;

      if (!(input instanceof HTMLInputElement)) {
        throw new Error('Event target is not HTMLInputElement');
      }

      tracks.filterString = input.value;

      this.searchChangeCallback();
    });
  }
}
