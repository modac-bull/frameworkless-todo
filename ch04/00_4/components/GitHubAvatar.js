const ERROR_IMAGE = "https://files-82ee7vgzc.now.sh"; // 오류 발생시
const LOADING_IMAGE = "https://files-8bga2nnt0.now.sh"; // 이미지 로드되는 동안

/* 
 입력으로 받은 GitHub 사용자 이름을 사용하여 
 GitHuB APi를 통해 해당 사용자의 아바타 URL을 가져온다.
 사용자가 존재하지 않거나, 네트워크 오류 등의 문제 발생시 오류 발생
*/
const getGitHubAvatarUrl = async (user) => {
  if (!user) {
    return;
  }

  const url = `https://api.github.com/users/${user}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data.avatar_url;
};

/* 
GitHubAvatar 클래스
*/
export default class GitHubAvatar extends HTMLElement {
  /* 
  인스턴스가 생성될 때 호출되는 생성자 함수
  url 속성을 LOADING_IMAGE로 초기화
  */
  constructor() {
    super();
    this.url = LOADING_IMAGE; // url을 LOADING_IMAGE로 초기화
  }

  /* 
  HTML 요소의 'user' 속성을 나타냄
  */
  get user() {
    return this.getAttribute("user");
  }

  set user(value) {
    this.setAttribute("user", value);
  }

  /* 
  웹 컴포넌트 내부의 내용을 렌더링 하는 함수
  현재 URL 사용하여 이미지 요소를 생성하고 추가
  */
  render() {
    window.requestAnimationFrame(() => {
      this.innerHTML = "";
      const img = document.createElement("img");
      img.src = this.url;
      this.appendChild(img);
    });
  }

  /* 
  현재 설정된 'user' 속성 값에 따라 GitHub 아바타 URL을 가져오려고 시도하는 비동기 함수.
  만약 API 호출에서 오류가 발생하면, 'url' 을 'ERROR_IMAGE'로 설정
  */
  async loadNewAvatar() {
    const { user } = this;
    if (!user) {
      return;
    }
    try {
      this.url = await getGitHubAvatarUrl(user);
    } catch (e) {
      this.url = ERROR_IMAGE;
    }

    this.render();
  }

  /* 
  connectedCallback - 웹 컴포넌트가 DOM에 연결될 떄 호출되는 함수
  */
  connectedCallback() {
    this.render();
    this.loadNewAvatar();
  }
}
