const registry = {};

const renderWrapper = (component) => {
  return (targetElement, state) => {
    const element = component(targetElement, state);

    const childComponents = element.querySelectorAll("[data-component]");

    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component;

      const child = registry[name];
      if (!child) {
        return;
      }

      target.replaceWith(child(target, state));
    });

    return element;
  };
};

const add = (name, component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root, state) => {
  const cloneComponent = (root) => {
    return root.cloneNode(true);
  };

  return renderWrapper(cloneComponent)(root, state);
};

export default {
  add,
  renderRoot,
};

/* 
registry.js 파일:
registry 객체: 이름으로 컴포넌트 함수를 관리하는 객체입니다.

renderWrapper 함수: 주어진 컴포넌트에 대한 렌더링 래퍼입니다. 주어진 컴포넌트를 렌더링하고, 반환된 요소 내부에서 다른 하위 컴포넌트들을 찾아 렌더링합니다. 이는 [data-component] 속성을 사용하여 하위 컴포넌트들을 찾습니다.

add 함수: 이름과 컴포넌트 함수를 registry에 추가합니다. 추가되는 컴포넌트는 renderWrapper로 감싸져서 추가됩니다, 즉, 해당 컴포넌트가 렌더링될 때 하위 컴포넌트들도 함께 렌더링될 수 있게 합니다.

renderRoot 함수: 루트 컴포넌트를 렌더링하는 함수입니다. 루트 컴포넌트는 단순히 복제되고, 그 후 renderWrapper를 사용하여 하위 컴포넌트들이 렌더링됩니다.

종합:
이 구조는 컴포넌트 기반의 프론트엔드 아키텍처에 기반하고 있습니다. registry는 모든 컴포넌트를 관리하며, 각 컴포넌트는 자신의 하위 컴포넌트들을 포함할 수 있습니다. 컴포넌트들은 [data-component] 속성을 사용하여 DOM에서 식별됩니다.

이러한 구조는 복잡한 UI 구조와 상호작용을 관리하기 위한 기본적인 컴포넌트 기반 아키텍처의 원리를 따르고 있습니다.

*/
