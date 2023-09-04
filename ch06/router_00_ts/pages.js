export default (container) => {
  const home = () => {
    container.innerHTML = "<div><h1>메인 페이지입니다.</h1></div>";
  };

  const list = () => {
    container.textContent = "This is List Page";
  };

  const notFound = () => {
    container.textContent = "Page Not Found!";
  };

  return {
    home,
    list,
    notFound,
  };
};
