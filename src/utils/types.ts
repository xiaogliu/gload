// process img to Gaussian blur
type processImg = (
  img: string | HTMLImageElement,
  canvas: string | HTMLCanvasElement,
  radius: number
) => void;

// constructor options
interface IOptions {
  seletor?: string;
  radius?: number;
  enabledClassName?: string;
  mode?: string;
}

export {processImg, IOptions}
