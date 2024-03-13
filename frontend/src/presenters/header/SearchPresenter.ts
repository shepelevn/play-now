import SearchComponent from '../../components/header/SearchComponent';
import TracksModel from '../../model/TracksModel';
import { notInitialized } from '../../utils/notInitialized';

export default class SearchPresenter {
  private readonly searchComponent: SearchComponent;
  public searchChangeCallback: () => void = notInitialized;

  constructor(
    private readonly parentElement: HTMLElement,
    tracks: TracksModel,
    className: string,
    inputClass: string,
    placeholder: string,
    inputId: string,
  ) {
    this.searchComponent = new SearchComponent(
      className,
      inputClass,
      placeholder,
      inputId,
    );

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
