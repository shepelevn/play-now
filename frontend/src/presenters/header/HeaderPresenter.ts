import HeaderComponent from '../../components/header/HeaderComponent';
import Tracks from '../../model/Tracks';
import ProfilePresenter from './ProfilePresenter';
import SearchPresenter from './SearchPresenter';

export default class HeaderPresenter {
  private headerComponent: HeaderComponent;
  public searchPresenter: SearchPresenter;

  constructor(
    private parentElement: HTMLElement,
    tracks: Tracks,
  ) {
    this.headerComponent = new HeaderComponent();

    const headerElement = this.headerComponent.getElement();
    this.parentElement.append(headerElement);

    this.searchPresenter = new SearchPresenter(headerElement, tracks);

    new ProfilePresenter(headerElement);
  }
}
