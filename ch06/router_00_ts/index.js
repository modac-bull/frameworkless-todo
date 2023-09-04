// import createRouter from "./router_origin.js";
// const router = createRouter();
import createPages from "./pages.js";
import Router from "./router.js";

const container = document.querySelector("main");
const pages = createPages(container);

const router = new Router();

/* 
라우터가 동작하게 하게 하려면 라우터를 구성하고 구성 요소를 올바른 프래그먼트에 연결해야 한다.
addRoute 메서드 : 새 라우터와 프래그먼트로 구성된 구성 객체, 구성 요소를 정의
setNotFound 메서드 : 레지스트리에 없는 모든 프래그먼트에 대한 제네릭 구성 요소를 설정
start 메서드 : 라우터를 초기화하고 URL 변경을 청취
*/
router
  .addRoute("#/", pages.home)
  .addRoute("#/list", pages.list)
  .setNotFound(pages.notFound)
  .init();
