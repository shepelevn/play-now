import HeaderComponent from '../components/header/HeaderComponent';
import ProfilePresenter from './ProfilePresenter';
import SearchPresenter from './SearchPresenter';

export default class HeaderPresenter {
  private headerComponent: HeaderComponent;

  constructor(private parentElement: HTMLElement) {
    this.headerComponent = new HeaderComponent();

    const headerElement = this.headerComponent.getElement();
    this.parentElement.append(headerElement);

    new SearchPresenter(headerElement);

    new ProfilePresenter(headerElement);
  }
}
