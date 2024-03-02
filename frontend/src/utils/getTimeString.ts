export function getTimeString(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  const secondsRemainder = seconds % 60;

  return `${minutes}:${String(secondsRemainder).padStart(2, '0')}`;
}
