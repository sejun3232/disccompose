export const Colors = {
  // 기본 상태
  success: 0x57f287,
  error: 0xed4245,
  warning: 0xfee75c,
  info: 0x5865f2,

  // 추가 색상
  primary: 0x5865f2,
  secondary: 0x99aab5,
  white: 0xffffff,
  black: 0x000000,
  blurple: 0x5865f2,
  greyple: 0x99aab5,
  darkButNotBlack: 0x2c2f33,
  notQuiteBlack: 0x23272a,
  red: 0xed4245,
  green: 0x57f287,
  yellow: 0xfee75c,
  blue: 0x5865f2,
  purple: 0x9b59b6,
  orange: 0xe67e22,
  pink: 0xff73fa,
} as const;

export type ColorName = keyof typeof Colors;

export function resolveColor(color: ColorName | `#${string}` | number): number {
  if (typeof color === "number") return color;
  if (color.startsWith("#")) return parseInt(color.slice(1), 16);
  return Colors[color as ColorName] ?? 0x5865f2;
}
