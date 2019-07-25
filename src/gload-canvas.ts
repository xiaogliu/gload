// @ts-ignore
import * as utils from "@/utils/tool.ts";
// @ts-ignore
import * as common from "@/utils/common.ts";
// @ts-ignore
import * as types from "@/utils/types.ts";
// StackBlur is an open source canvas Gaussian algorithm blur image
// @ts-ignore
import { image as processImage } from "@/utils/stackblur-es.js";

class GloadCanvas {
  private options: types.IOptions;

  constructor(options?: types.IOptions) {
    this.options = { ...common.defaultOptions, ...options };
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
          common.setBlur(e, this.options, processImage)
        }

        common.createLargeImg(e)
      });
    });
  }
}

export default GloadCanvas;
