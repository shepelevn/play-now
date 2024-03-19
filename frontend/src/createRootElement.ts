import { createElement } from './utils/dom/createElement';

export function createRootElement(): HTMLElement {
  document.body.innerHTML = '';

  const rootDiv: HTMLElement = createElement(
    '<div class="over-wrapper" style="position: relative; overflow: hidden; "></div>',
  );

  document.body.append(rootDiv);

  return rootDiv;
}
