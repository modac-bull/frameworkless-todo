const DEFAULT_COLOR = "black";

export default class HelloWorld extends HTMLElement {

  /* 
  color 게터 / 세터
  get color() : color의 속성의 값을 가져오는 역할
  set color(value) : color 속성의 값을 설정하는 역할
  */
  get color() {
    return this.getAttribute("color") || DEFAULT_COLOR;
  }

  set color(value) {
    this.setAttribute("color", value);
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      const div = document.createElement("div");
      div.textContent = "Hello World!";

      div.style.color = this.color;

      this.appendChild(div);
    });
  }
}
