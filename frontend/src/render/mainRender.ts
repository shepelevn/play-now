import RootComponent from '../components/RootComponent';
import { createElement } from '../utils/createElement';

export { mainRender };

function mainRender(): void {
  document.body.innerHTML = '';

  const wrapperDiv = createElement(
    '<div class="over-wrapper" style="position: relative; overflow: hidden; "></div>',
  );
  document.body.append(wrapperDiv);

  renderComponents(wrapperDiv);
}

function renderComponents(wrapperDiv: HTMLElement): void {
  wrapperDiv.append(new RootComponent().getElement());
}
