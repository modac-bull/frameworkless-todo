/* 
기본 HTML 템플릿
*/
const TEMPLATE = '<ul class="todo-list"></ul>';

/* 
삭제 이벤트의 이름을 포함하는 객체
*/
export const EVENTS = {
  DELETE_ITEM: "DELETE_ITEM",
};

/* 
기본 HTML 요소를 확장하여 사용자 정의 웹 컴포넌트인 List 클래스를 정의
*/
export default class List extends HTMLElement {
  /* 
  이 웹 컴포넌트에서 감시하려는 속성의 목록
  - todo 속성만을 감시한다.
  */
  static get observedAttributes() {
    return ["todos"];
  }

  /* 
  todos 속성의 값을 가져오는 getter
  속성이 없으면 빈 배열을 반환, 있으면 JSON으로 파싱하여 반환
  */
  get todos() {
    if (!this.hasAttribute("todos")) {
      return [];
    }

    return JSON.parse(this.getAttribute("todos"));
  }

  /* 
  todos 속성의 값을 설정하는 setter
  주어진 값을 JSON 문자열로 변환하여 설정
  */
  set todos(value) {
    this.setAttribute("todos", JSON.stringify(value));
  }

  /* 
  삭제 버튼 클릭시 호출되는 메서드
  해당 인덱스의 할 일을 삭제하는 사용자 정의 이벤트 발생
  */
  onDeleteClick(index) {
    const event = new CustomEvent(EVENTS.DELETE_ITEM, {
      detail: {
        index,
      },
    });

    this.dispatchEvent(event);
  }

  /* 
  새로운 할 일 항목을 위한 DOM 노드를 생성하는 메서드
  */
  createNewTodoNode() {
    return this.itemTemplate.content.firstElementChild.cloneNode(true);
  }

  /* 
  주어진 할 일 데이터를 사용하여 DOM 요소를 생성하고 반환하는 메서드
  */
  getTodoElement(todo, index) {
    const { text, completed } = todo;

    const element = this.createNewTodoNode();

    element.querySelector("input.edit").value = text;
    element.querySelector("label").textContent = text;

    if (completed) {
      element.classList.add("completed");
      element.querySelector("input.toggle").checked = true;
    }

    element.querySelector("button.destroy").dataset.index = index;

    return element;
  }

  /* 
  현재의 todos의 속성에 따라 할 일 목록을 업데이트하는 메서드
  */
  updateList() {
    this.list.innerHTML = "";

    this.todos.map(this.getTodoElement.bind(this)).forEach((element) => {
      this.list.appendChild(element);
    });
  }

  /* 
  웹 컴포넌트가 DOM에 연결될 때 호출되는 콜백
  여기서 초기 설정과 이벤트 리스터를 추가
  */
  connectedCallback() {
    this.innerHTML = TEMPLATE;
    this.itemTemplate = document.getElementById("todo-item");

    this.list = this.querySelector("ul");

    this.list.addEventListener("click", (e) => {
      if (e.target.matches("button.destroy")) {
        this.onDeleteClick(e.target.dataset.index);
      }
    });

    this.updateList();
  }

  /* 
  감시 중인 속성이 변경될 떄 호출되는 콜백
  todos 속성이 변경될 때마다 목록을 업데이트함
   */
  attributeChangedCallback() {
    this.updateList();
  }
}

/* 
사용자 정의 웹 컴포넌트로
todos 속성을 사용하여 할 일 목록을 관리하고 표시하는 기능을 제공
*/
