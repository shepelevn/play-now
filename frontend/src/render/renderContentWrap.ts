import SidebarComponent from '../components/sidebar/SidebarComponent';

export function renderContentWrap(
  sidebar: SidebarComponent,
  mainTemplate: string,
): string {
  return `<div class="content-wrap flex">
  ${sidebar.getTemplate()}
  ${mainTemplate}
  </div>`;
}
