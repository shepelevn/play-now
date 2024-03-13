import HeaderComponent from '../../components/header/HeaderComponent';
import TracksModel from '../../model/TracksModel';
import ProfilePresenter from './ProfilePresenter';
import SearchPresenter from './SearchPresenter';

export default class HeaderPresenter {
  private readonly headerComponent: HeaderComponent;
  public searchPresenter: SearchPresenter;

  constructor(
    private readonly parentElement: HTMLElement,
    tracks: TracksModel,
  ) {
    this.headerComponent = new HeaderComponent();

    const headerElement = this.headerComponent.getElement();
    this.parentElement.append(headerElement);

    this.searchPresenter = new SearchPresenter(
      headerElement,
      tracks,
      'header__search',
      'header__search__field',
      'ЧТО БУДЕМ ИСКАТЬ?',
      'desktop-search',
    );

    new ProfilePresenter(headerElement);
  }
}
