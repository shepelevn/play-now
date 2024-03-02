import SidebarComponent from '../components/sidebar/SidebarComponent';

export type Playlist = {
  name: string;
};

export default class SidebarPresenter {
  constructor(private parentElement: HTMLElement) {
    const playlists: Playlist[] = [
      {
        name: 'Плейлист #1',
      },
      {
        name: 'Плейлист #2',
      },
      {
        name: 'Плейлист #3',
      },
      {
        name: 'Плейлист #4',
      },
      {
        name: 'Плейлист #4',
      },
      {
        name: 'Плейлист #5',
      },
      {
        name: 'Плейлист #6',
      },
      {
        name: 'Плейлист #7',
      },
    ];

    this.parentElement.append(new SidebarComponent(playlists).getElement());
  }
}
