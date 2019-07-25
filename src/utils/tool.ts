// select html element
export const $ = <T>(selector: any, scope = document): T =>
  scope.querySelector(selector);

// add / remove class
export function hasClass(elements: HTMLElement, cName: string) {
  // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
  return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
}
export function addClass(elements: HTMLElement, cName: string) {
  if (!hasClass(elements, cName)) {
    elements.className += " " + cName;
  }
}
