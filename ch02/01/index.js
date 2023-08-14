/* 모듈 임포트 */
import getTodos from "./getTodos.js";
import view from "./view.js";

const state = {
  todos: getTodos(),
  currentFilter: "All",
};

const main = document.querySelector(".todoapp");

/* 
 브라우저의 다음 리페인트가 발생하기 직전에 특정 코드를 실행하고 싶을 때 사용
 모든 DOM 조작이나 애니메이션은 이 DOM API를 기반으로 해야 한다.
 이 API는 메인 스레드를 차단하지 않으며 다음 리페인트가 이벤트 루프에서 스케줄링 되기 직전에 실행된다.
*/
window.requestAnimationFrame(() => {
  const newMain = view(main, state);
  main.replaceWith(newMain);
});
