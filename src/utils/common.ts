// @ts-ignore
import * as utils from "@/utils/tool.ts";
// @ts-ignore
import * as types from "@/utils/types.ts";

// create large image
function createLargeImg(e: HTMLElement): void {
  // load large image
  const imgLarge: HTMLImageElement = new Image();
  // ie10 not support dataset
  imgLarge.src = e.getAttribute("data-large");
  imgLarge.onload = () => {
    // img fade in load
    utils.addClass(imgLarge, "loaded");
  };
  e.appendChild(imgLarge);
}

// set blur effect
function setBlur(e: HTMLElement, options: types.IOptions, processImage?: types.processImg, ): void {
  // when small image loaded handling it use canvas
  const img: HTMLImageElement = new Image();
  const $small: HTMLImageElement = e.querySelector("img");
  let $canvas: HTMLCanvasElement;
  // canvas mode
  if (processImage) {
    const addInnerHtml: string = `
              <canvas></canvas>
            `;
    e.innerHTML = e.innerHTML + addInnerHtml;
    $canvas = e.querySelector("canvas");
  } else {
    // css3 mode
    $small.style.filter = "blur(5px)";
    $small.style.transform = "scale(1)";
  }

  img.src = $small.src;
  img.onload = () => {
    // canvas mode
    if (processImage) {
      processImage($small, $canvas, options.radius);
      utils.addClass($canvas, "loaded");
    }

    // css3 mode
    utils.addClass($small, "loaded");
  };
}

// default options
const defaultOptions: types.IOptions = {
  seletor: ".gload-image-container",
  radius: 30,
  mode: "canvas"
};

export { createLargeImg, setBlur, defaultOptions };
