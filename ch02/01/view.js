const getTodoElement = (todo) => {
  const { text, completed } = todo;

  return `
  <li ${completed ? 'class="completed"' : ""}>
    <div class="view">
      <input 
        ${completed ? "checked" : ""}
        class="toggle" 
        type="checkbox">
      <label>${text}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${text}">
  </li>`;
};

const getTodoCount = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed);

  const { length } = notCompleted;
  if (length === 1) {
    return "1 Item left";
  }

  return `${length} Items left`;
};

export default (targetElement, state) => {
  const { currentFilter, todos } = state;

  /* 대상 요소의 복제본을 만든다.
  - 원본 DOM 요소에 직접 변경을 가하지 않고 변경된 새 요소를 반환하기 위함
  - 직접적인 DOM 조작이 반복 => 리페인트/리프로우를 수행해야 할 수 있음
  - 솔루션 : 오프스크린(virtual, detached)에서 요소를 조작한 후 그 결과를 한 번에 DOM 에 적용하는 방법

  */
  const element = targetElement.cloneNode(true);

  const list = element.querySelector(".todo-list");
  const counter = element.querySelector(".todo-count");
  const filters = element.querySelector(".filters");

  list.innerHTML = todos.map(getTodoElement).join("");
  counter.textContent = getTodoCount(todos);

  Array.from(filters.querySelectorAll("li a")).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }
  });

  return element;
};

/* /////////  코드 리뷰  ////////////

1. 하나의 거대한 함수
=> 여러 DOM 요소를 조작하는 함수가 단 하나뿐, 복잡해질 수 있음

2. 동일한 작업을 수행하는 여러 방법
=> 문자열을 통해 리스트 항목을 생성.

*/ /////////////////////////////////
