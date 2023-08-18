/* URL 경로의 파라미터(:id, :section)를 식별하는 정규식 */
const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
/* URL 파라미터의 값을 캡처하는 정규식 */
const URL_FRAGMENT_REGEXP = "([^\\/]+)";

/*
route및 windowHash를 받아서 해당 라우트의 파라미터를 추출하는 함수
params 객체 초기화, 해당 라우트에 파라미터 없으면 객체를 반환
windowHas, router.testRegExp 를 사용하여 파라미터 값을 캡쳐
*/
const extractUrlParams = (route, windowHash) => {
  const params = {};

  if (route.params.length === 0) {
    return params;
  }

  const matches = windowHash.match(route.testRegExp);

  matches.shift();

  matches.forEach((paramValue, index) => {
    const paramName = route.params[index];
    params[paramName] = paramValue;
  });

  return params;
};

export default () => {
  const routes = [];
  let notFound = () => {};

  const router = {};

  const checkRoutes = () => {
    const { hash } = window.location;

    const currentRoute = routes.find((route) => {
      const { testRegExp } = route;
      return testRegExp.test(hash);
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    const urlParams = extractUrlParams(currentRoute, window.location.hash);

    console.log("urlParams", urlParams);

    currentRoute.component(urlParams);
  };

  router.addRoute = (fragment, component) => {
    const params = [];

    const parsedFragment = fragment
      .replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => {
        params.push(paramName);
        return URL_FRAGMENT_REGEXP;
      })
      .replace(/\//g, "\\/");

    console.log(`^${parsedFragment}$`);

    routes.push({
      testRegExp: new RegExp(`^${parsedFragment}$`),
      component,
      params,
    });

    return router;
  };

  router.setNotFound = (cb) => {
    notFound = cb;
    return router;
  };

  router.navigate = (fragment) => {
    window.location.hash = fragment;
  };

  router.start = () => {
    window.addEventListener("hashchange", checkRoutes);

    if (!window.location.hash) {
      window.location.hash = "#/";
    }

    checkRoutes();
  };

  return router;
};
