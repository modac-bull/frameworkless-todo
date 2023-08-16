const section = document.querySelector(".section");
const button = document.querySelector("button");

section.addEventListener(
  "click",
  () => {
    console.log("section 클릭");
  },
  true
);

button.addEventListener(
  "click",
  () => {
    console.log("버튼 클릭");
  },
  false
);

/* 커스텀 이벤트 */
const EVENT_NAME = "FiveCharInputValue";
const input = document.querySelector("input");

input.addEventListener("input", () => {
  const { length } = input.value;
  console.log("input length", length);
  if (length === 5) {
    const time = new Date().getTime();
    const event = new CustomEvent(EVENT_NAME, {
      detail: {
        time,
      },
    });
    input.dispatchEvent(event);
  }
});

input.addEventListener(EVENT_NAME, (e) => {
  console.log("handling custom event...", e.detail);
});
