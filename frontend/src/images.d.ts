declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.sprite.svg' {
  const content: { url: string };
  export default content;
}
