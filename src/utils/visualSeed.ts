export type StarTheme = {
  accent: string;
  secondary: string;
  hue: number;
  points: ReadonlyArray<readonly [number, number]>;
  orbitAngle: number;
  burstCount: number;
};
const PALETTE: readonly (readonly [string, string, number])[] = [
  ['#d4bcff', '#90d9ff', 261],
  ['#ffc5e3', '#d4bcff', 330],
  ['#fff0c1', '#ffc5e3', 42],
  ['#90d9ff', '#c5d7ff', 199],
  ['#e0ccff', '#ffe4cf', 276],
  ['#bde6e8', '#ded0ff', 171],
  ['#f3cfff', '#ffe1ec', 290],
  ['#cbd5ff', '#ffdbf0', 231]
];

/** Cùng một STT sẽ có màu và chòm sao giống nhau ở mọi lần truy cập. */
export function makeVisualSeed(stt: number): StarTheme {
  let seed = (stt * 2654435761) >>> 0;
  function rand(): number {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  }
  const swatch = PALETTE[Math.floor(rand() * PALETTE.length)];
  const count = 6 + Math.floor(rand() * 3);
  const points: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2 + (rand() - .5) * .6;
    const radius = .22 + rand() * .25;
    points.push([.5 + Math.cos(angle) * radius, .5 + Math.sin(angle) * radius]);
  }
  return {
    accent: swatch[0], secondary: swatch[1], hue: swatch[2],
    points, orbitAngle: rand() * 360, burstCount: 10 + Math.floor(rand() * 10)
  };
}
