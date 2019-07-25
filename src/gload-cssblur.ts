// @ts-ignore
import * as utils from "@/utils/tool.ts";
// @ts-ignore
import * as common from "@/utils/common.ts";
// @ts-ignore
import * as types from "@/utils/types.ts";

class GloadCSSBlur {
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
        if (!this.options.disabledClassName) {
          common.setBlur(e, this.options)
        } else if (!utils.hasClass(e, this.options.disabledClassName)) {
          common.setBlur(e, this.options)
        }

        common.createLargeImg(e)
      });
    });
  }
}

export default GloadCSSBlur;
