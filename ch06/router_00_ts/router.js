class Router {
  routes; // routes 프로퍼티의 타입 선언
  notFound;

  constructor() {
    // 등록된 라우트를 저장할 배열
    this.routes = [];

    // 경로가 발견되지 않았을 때 실행될 콜백 함수. 아무것도 하지 않는 함수로 초기화되어있음.
    this.notFound = () => {};
  }

  // 현재 URL의 해시값과 일치하는 라우트를 'routes' 배열에서 찾는다
  checkRoutes() {
    // 메서드를 private로 선언하여 외부에서 접근을 제한
    const currentRoute = this.routes.find(
      (route) => route.fragment === window.location.hash
    );

    if (!currentRoute) {
      this.notFound();
      return;
    }

    // pages.js에서 설정한 컴포넌트 함수 렌더링
    currentRoute.component();
  }

  // 새로운 라우트를 routes 배열에 추가. 체이닝을 위해 this를 반환
  addRoute(fragment, component) {
    this.routes.push({
      fragment,
      component,
    });

    return this;
  }

  // notFound 콜백을 설정
  setNotFound(cb) {
    this.notFound = cb;
    return this;
  }

  // 라우팅을 시작하는 함수
  init() {
    window.addEventListener("hashchange", this.checkRoutes.bind(this));
    if (!window.location.hash) {
      window.location.hash = "#/";
    }

    this.checkRoutes();
  }
}

export default Router;
