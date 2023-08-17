// HelloWorld 클래스를 가져옴
import HelloWorld from './components/HelloWorld.js'
/* 
사용자 지정 요소를 등록
해당 요소를 웹 페이지에서 사용할 수 있게 됨

hello-world 는 사용자 지정 요소의 이름
HelloWorld는 해당 이름에 대응하는 클래스

웹 페이지 어디에서든 <hello-world/> 태그를 사용하면 웹 브라우저는
HelloWorld 클래스의 인스턴스를 생성하고 'connectedCallback 메서드를 호출하여
내부에 "<div>Hello World!</div>" 요소를 삽입
*/
window
  .customElements
  .define('hello-world', HelloWorld)
