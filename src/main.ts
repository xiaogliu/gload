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
// @ts-ignore
import { image as processImage } from "@/utils/stackblur-es.js";
// @ts-ignore
import * as utils from "@/utils/tool.ts";

interface IOptions {
  seletor?: string;
  radius?: number;
  enabledClassName?: string;
  mode?: string;
}

class Gload {
  private options: IOptions;
  private $canvas: HTMLCanvasElement;

  constructor(options?: IOptions) {
    const defaultOptions: IOptions = {
      seletor: ".gload-image-container",
      radius: 30,
      mode: "canvas"
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
        // if
        if (utils.hasClass(e, this.options.enabledClassName)) {
          // when small image loaded handling it use canvas
          const img: HTMLImageElement = new Image();
          const $small: HTMLImageElement = e.querySelector("img");

          if (this.options.mode === "canvas") {
            const addInnerHtml: string = `
            <canvas></canvas>
          `;
            e.innerHTML = e.innerHTML + addInnerHtml;
            this.$canvas = e.querySelector("canvas");
          } else {
            $small.style.filter = "blur(15px)";
          }
          img.src = $small.src;
          img.onload = () => {
            // canvas mode
            if (this.options.mode === "canvas") {
              processImage($small, this.$canvas, this.options.radius);
              utils.addClass(this.$canvas, "loaded");
            }

            // css3 mode
            utils.addClass($small, "loaded");
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

export default Gload;
