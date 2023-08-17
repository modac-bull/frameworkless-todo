
// HelloWorld 라는 이름의 클래스가 정의
// 이 클래스는 기본 HTMLElement 를 확장하므로 웹 페이지의 사용자 지정 요소로 작동.
export default class HelloWorld extends HTMLElement {
  // Custom Element의 생명주기 콜백 중 하나.
  // 해당 요소가 DOM에 연결될 때 호출.
  // 웹 페이지에 요소가 추가될 때마다 이 메서드가 실행 

  /* 
  사용자 정의 요소의 라이프사이클 메서드 중 하나
  DOM 에 연결될 때 호출
  리액트의 'componentDidMount' 메서드와 유사
  
  */
  connectedCallback () {
    // 다음 프레임이 리페인트 될 때 까지 지정된 함수를 지연시키는 데 사용
    window.requestAnimationFrame(() => {
      this.innerHTML = '<div>Hello World!</div>'
    })
  }
}

/* 
 
*/
