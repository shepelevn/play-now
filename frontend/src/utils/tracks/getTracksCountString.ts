import plural from 'plural-ru';

export function getTracksCountString(count: number): string {
  return count !== 0
    ? plural(count, '%d трек', '%d трека', '%d треков')
    : 'Нет треков';
}
