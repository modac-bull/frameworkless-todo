export default () => {
  /* 
  등록된 라우트를 저장할 배열
  각 라우트는 fragment와 해당 fragment에 대응되는 컴포넌트(함수 또는 콜백)으로 구성
   */
  const routes = [];

  /* 
  경로가 발견되지 않았을 때 실행될 콜백 함수
  아무것도 하지 않는 함수로 초기화되어있음
  */
  let notFound = () => {};

  const router = {};

  /* 
  현재 URL의 해시값과 일치하는 라우트를 'routes' 배열에서 찾는다
  만약 일치하는 라우트가 없으면 'notFound' 콜백 함수 실행
  일치하는 라우트 있다면 해당 라우트의 'component' 함수를 실행
  */
  const checkRoutes = () => {
    const currentRoute = routes.find((route) => {
      return route.fragment === window.location.hash;
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    currentRoute.component();
  };

  /* 
  새로운 라우트를 routes 배열에 추가, 체이닝을 위해 router 객체를 반환
   */
  router.addRoute = (fragment, component) => {
    routes.push({
      fragment,
      component,
    });

    return router;
  };

  /* 
  noutFound 콜백을 설정
   */
  router.setNotFound = (cb) => {
    notFound = cb;
    return router;
  };

  /* 
  라우팅을 시작하는 함수
  hashchange 이벤트에 대한 리스너를 추가
  현재의 해시값이 없다면 기본 해시값 설정한 후 checkRoutes 함수를 호출하여 현재 라우트를 체크
  */
  router.start = () => {
    window.addEventListener("hashchange", checkRoutes);

    if (!window.location.hash) {
      window.location.hash = "#/";
    }

    checkRoutes();
  };

  /* 
  router 객체를 반환 => 이를 통해 사용자는 라우트를 추가하거나 설정을 변경할 수 있음
  */
  return router;
};
