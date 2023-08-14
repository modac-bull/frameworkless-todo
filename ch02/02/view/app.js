import todosView from "./todos.js";
import counterView from "./counter.js";
import filtersView from "./filters.js";

export default (targetElement, state) => {
  const element = targetElement.cloneNode(true);

  const list = element.querySelector(".todo-list");
  const counter = element.querySelector(".todo-count");
  const filters = element.querySelector(".filters");

  list.replaceWith(todosView(list, state));
  counter.replaceWith(counterView(counter, state));
  filters.replaceWith(filtersView(filters, state));

  return element;
};

/* 
파일 내용:

Import 구문:
todos.js, counter.js, filters.js 파일로부터 각각의 뷰 로직을 가져옵니다. 
각 파일에서 export된 함수들은 특정 DOM 요소와 상태(state)를 입력으로 받아 처리된 DOM 요소를 반환하는 것으로 예상됩니다.

Default Export 함수:
이 함수는 대상 요소(targetElement)와 상태(state)를 매개변수로 받습니다.
함수 내부에서는 targetElement의 복제본(element)을 생성합니다.
그 후, 복제본 내부에서 .todo-list, .todo-count, .filters 클래스를 가진 각 요소를 찾습니다.
각 찾은 요소들(list, counter, filters)에 대해서 해당하는 뷰 함수(todosView, counterView, filtersView)를 호출하여 처리된 DOM 요소를 반환받습니다.
반환받은 DOM 요소는 원래 위치에 .replaceWith 메서드를 사용하여 교체됩니다.
함수는 처리된 복제본(element)를 반환합니다.


해석:
이 파일은 주어진 targetElement와 state에 기반하여, 메인 애플리케이션의 각 주요 부분(할 일 목록, 카운터, 필터 옵션)의 뷰를 업데이트하는 로직을 포함하고 있습니다. 각 부분의 뷰 로직은 별도의 모듈로 분리되어 있고, app.js에서는 이들 모듈을 조합하여 전체 애플리케이션 뷰를 구성하고 있습니다.
이렇게 구조화하면 각 뷰 로직의 관심사가 명확하게 분리되어 코드의 가독성과 유지보수성이 향상됩니다.

*/
