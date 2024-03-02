import Component from '../components/Component';

export function renderMain(pageComponent: Component): string {
  return `
    <main class="main">
      ${pageComponent.getTemplate()}
    </main>
  `;
}
