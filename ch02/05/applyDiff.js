/**
 * 두 개의 노드가 다른지 판별
 * 1. 두 노드의 속성(attribute)간의 차이를 검사 => 속성수가 다르면 다른 노드
 * 2. 속성수가 같으면, 각 속성의 값이 다른지 검사 => 속성의 값이 다르면 다른 노드
 * 3. 속성이 동일하다? => 두 노드의 자식 수, textContent 수 비교해서 다르면 다른 노드
 */
const isNodeChanged = (node1, node2) => {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;
  if (n1Attributes.length !== n2Attributes.length) {
    // 1. 속성 수가 다르면 다른 노드
    return true;
  }

  // 2. 각 속성의 값이 다른지 검사
  const differentAttribute = Array.from(n1Attributes).find((attribute) => {
    const { name } = attribute;
    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);

    return attribute1 !== attribute2;
  });

  if (differentAttribute) {
    return true;
  }

  // 3. 두 노드의 자식 노드 변동 여부 검사
  if (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  }

  return false;
};

/**
 *
 * @param {*} parentNode - 현재 차이를 적용할 부모 노드
 * @param {*} realNode - 실제 DOM에서의 현재 노드
 * @param {*} virtualNode - 가상 DOM에서의 현재 노드
 * @returns
 */
const applyDiff = (parentNode, realNode, virtualNode) => {
  // 새 노드가 정의되어 있지 않은 경우 실제 노드를 삭제
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }

  // 실제 노드가 정의되지 않았지만 가상 노드가 존재하는 경우 부모 노드에 가상 노드 추가
  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  // 두 노드가 모두 정의된 경우, 두 노드 간에 차이가 있는 지 확인
  // 바꼈다면 실제 노드를 가상 노드로 변경
  if (isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  const max = Math.max(realChildren.length, virtualChildren.length);
  for (let i = 0; i < max; i++) {
    // 재귀적으로 실행
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default applyDiff;

/* 
diff 조건
1. 속성 수가 다르다.
2. 하나 이상의 속성이 변경
3. 노드에는 자식이 없으며, textContent가 다르다.
*/
