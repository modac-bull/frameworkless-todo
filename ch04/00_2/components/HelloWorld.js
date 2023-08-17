const DEFAULT_COLOR = "black";

export default class HelloWorld extends HTMLElement {
  /* 
  observedAttributes 정적 메서드
  - 웹 컴포넌트에서 관찰할 속성의 목록을 반환하는 정적 게터
  - color 속성만 관찰하도록 되어 있다.
  즉, color 속성의 값이 변경될 때마다 attributeChangedCallback 메서드가 호출된다.
  */
  static get observedAttributes() {
    return ["color"];
  }

  get color() {
    return this.getAttribute("color") || DEFAULT_COLOR;
  }

  set color(value) {
    this.setAttribute("color", value);
  }
  /* 
  관찰 중인 속성의 값이 변경될 때 호출되는 메서드.
  color 속성의 값이 변경되면 div 요소의 텍스트 색상을 변경되는 로직
  변경된 속성의 이름, 속성의 이전 값, 속성의 새로운 값이라는 세 가지 매개변수를 받는다.
  (참고)
  observedAttributes 배열에 나열된 속성만 트리거됨
  */
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.div) {
      return;
    }

    if (name === "color") {
      this.div.style.color = newValue;
    }
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      this.div = document.createElement("div");
      this.div.textContent = "Hello World!";
      this.div.style.color = this.color;
      this.appendChild(this.div);
    });
  }
}

/* 


*/
