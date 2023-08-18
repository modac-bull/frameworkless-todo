import { EVENTS } from "./List.js";

export default class App extends HTMLElement {
  constructor() {
    super();
    this.state = {
      todos: [], // 할 일 항목들의 배열
      filter: "All", // 현재 활성화된 필터
    };

    this.template = document.getElementById("todo-app"); // todo-app ID를 가진 템플릿 가져옴
  }

  /* 
  지정된 인덱스의 할일 항목을 삭제하는 함수
  삭제 후엔 속성 동기화 메서드를 호출
  */
  deleteItem(index) {
    this.state.todos.splice(index, 1);
    this.syncAttributes();
  }

  /* 
  새로운 할 일 항목을 추가하는 함수
  항목을 추가한 후, 속성 동기화 메서드를 호출
  */
  addItem(text) {
    this.state.todos.push({
      text,
      completed: false,
    });
    this.syncAttributes();
  }

  /* 
  list/footer 컴포넌트의 속성을 현재 상태에 따라 동기화하는 메서드
  */
  syncAttributes() {
    this.list.todos = this.state.todos;
    this.footer.todos = this.state.todos;
    this.footer.filter = this.state.filter;
  }

  /* 
  웹 컴포넌트가 DOM 에 연결될 때 호출되는 콜백
  requestAnimationFrame을 사용하여 DOM 업데이트를 예약
  */
  connectedCallback() {
    window.requestAnimationFrame(() => {
      const content = this.template.content.firstElementChild.cloneNode(true);

      this.appendChild(content);

      this.querySelector(".new-todo").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.addItem(e.target.value);
          e.target.value = "";
        }
      });

      this.footer = this.querySelector("todomvc-footer");

      this.list = this.querySelector("todomvc-list");
      this.list.addEventListener(EVENTS.DELETE_ITEM, (e) => {
        this.deleteItem(e.detail.index);
      });

      this.syncAttributes();
    });
  }
}

/* 
사용자 정의 웹 컴포넌트를 정의
이 컴포넌트는 할 일 목록 관리와 관련된 기능들을 제공한다.
할 일 항목을 추가/삭제하면 내부 상태가 업데이트되고 관련 컴포넌트의 속성도 동기화된다.
*/
