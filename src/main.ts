/**
 * @preserve
 * Progressive load image
 *
 * @param { object } options init options
 * @return void
 *
 * @date 2019-07-10
 * @author Xiaoguang Liu <vincexgliu@gmail.com>
 */

// StackBlur is an open source canvas gauss algorithm blur image
import * as StackBlur from "@/utils/stackblur-es.min.js";
// @ts-ignore
import * as utils from "@/utils/tool.ts";

interface IOptions {
  seletor?: string;
  radius?: number;
  disabled?: boolean;
  enabledClassName?: string;
}

class ProgressiveLoad {
  private options: IOptions;

  constructor(options?: IOptions) {
    const defaultOptions: IOptions = {
      seletor: ".p-load-image-container",
      radius: 30,
      disabled: false
    };

    this.options = { ...defaultOptions, ...options };

    this.init();
  }

  private init() {
    document.addEventListener("DOMContentLoaded", () => {
      const imageNodeList: NodeListOf<HTMLElement> = document.querySelectorAll(
        this.options.seletor
      );
      const imageContainer: HTMLElement[] = Array.prototype.slice.apply(
        imageNodeList
      );

      // set each image progessive loading
      imageContainer.forEach(e => {
        // only valid for
        if (
          !this.options.disabled ||
          utils.hasClass(e, this.options.enabledClassName)
        ) {
          const addInnerHtml: string = `
            <canvas></canvas>
          `;
          e.innerHTML = e.innerHTML + addInnerHtml;
          const $canvas: HTMLCanvasElement = e.querySelector("canvas");

          // when small image loaded handling it use canvas
          const img: HTMLImageElement = new Image();
          const $small: HTMLImageElement = e.querySelector("img");
          img.src = $small.src;
          img.onload = () => {
            StackBlur.image($small, $canvas, this.options.radius);

            // let canvas fade in load
            utils.addClass($canvas, "loaded");
          };
        }

        // load large image
        const imgLarge: HTMLImageElement = new Image();
        // ie10 not support dataset
        imgLarge.src = e.getAttribute("data-large");
        imgLarge.onload = () => {
          // img fade in load
          utils.addClass(imgLarge, "loaded");
          // @preserve imgLarge.classList.add("loaded");
        };
        e.appendChild(imgLarge);
      });
    });
  }
}

export default ProgressiveLoad;
