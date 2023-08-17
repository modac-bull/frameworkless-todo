import applyDiff from "./applyDiff.js";
/* 
Virtual DOM 의 아이디어에 기반
웹 프론트엔드 프레임워크에서 성능 최적화를 위해 사용되는 패턴 중 하나.
실제 DOM 을 직접 조작하는 것은 비용이 크므로 , 가상의 DOM 트리를 만들고 이를 실제 DOM과 비교하여
필요한 최소한의 변경만 실제 DOM 에 반영하는 것.
*/

const DEFAULT_COLOR = "black";

const createDomElement = (color) => {
  const div = document.createElement("div");
  div.textContent = "Hello World!";
  div.style.color = color;
  return div;
};

export default class HelloWorld extends HTMLElement {
  static get observedAttributes() {
    return ["color"];
  }

  get color() {
    return this.getAttribute("color") || DEFAULT_COLOR;
  }

  set color(value) {
    this.setAttribute("color", value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.hasChildNodes()) {
      return;
    }

    /* 실제 DOM과 가상 DOM 사이의 차이를 최소화하여 DOM 조작 비용을 줄인다. */
    applyDiff(this, this.firstElementChild, createDomElement(newValue));
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      this.appendChild(createDomElement(this.color));
    });
  }
}
