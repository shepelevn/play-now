export function getTimeString(ms: number): string {
  const seconds = Math.round(ms / 1000);

  const minutes = Math.floor(seconds / 60);
  const secondsRemainder = seconds % 60;

  return `${minutes}:${String(secondsRemainder).padStart(2, '0')}`;
}
