let x = 0;
let xNew = 0;
let xOffset = 0;

let banner = document.querySelector(".banner");
let images = document.querySelectorAll(".image");

let windowWidth = document.documentElement.clientWidth;
let step = windowWidth / 2 / 5;

let dataImages = [
  { x: 0, b: 4 },
  { x: 0, b: 0 },
  { x: 0, b: 1 },
  { x: 0, b: 4 },
  { x: 0, b: 5 },
  { x: 0, b: 6 },
]

/**
 * 初始化圖片樣式
 */
let init = () => {
  for (const key in images) {
    if (!images.hasOwnProperty(key)) {
      continue;
    }

    const element = images[key];
    const elementData = dataImages[key];

    element.children[0].style = `transition:.2s; transform:translate(${elementData.x}px); filter:blur(${elementData.b}px)`;
  }
}

let blinkIndex = 0;
let timeout = 4000;
let blink = () => {

  if (blinkIndex === 4) {
    blinkIndex = 1;
    timeout = 2000;
  } else {
    blinkIndex++;
    timeout = 40;
  }

  images[1].children[0].src = `images/girl${blinkIndex}.png`

  setTimeout(() => {
    blink();
  }, timeout);
}

window.onload = () => {
  init();
  blink();
}

banner.addEventListener("mouseover", (e) => {
  x = e.clientX;
})

banner.addEventListener("mousemove", (e) => {
  xNew = e.clientX;
  xOffset = x - xNew;
  for (const key in images) {
    if (images.hasOwnProperty(key)) {
      const level = (6 - parseInt(key)) * 10;
      const element = images[key];
      const elementData = dataImages[key]
      const bNew = Math.abs(elementData.b + (xOffset / step));
      const lNew = -(xOffset / level);
      element.children[0].style = `transform:translate(${lNew}px); filter:blur(${bNew}px)`;
    }
  }
})

banner.addEventListener("mouseout", () => init())