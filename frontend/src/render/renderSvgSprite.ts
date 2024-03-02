export function renderSvgSprite(
  spriteUrl: string,
  className: string = '',
): string {
  return `
    <svg class="${className}">
      <use xlink:href="${spriteUrl}"></use>
    </svg>
    `;
}
