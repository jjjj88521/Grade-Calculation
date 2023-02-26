let hero = document.querySelector(".hero"),
  slider = document.querySelector(".slider"),
  animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();

// Parameter1 is the object to be controlled
// Paremeter2 is duration
// parameter3 is the initial state of the object to be controlled
// parameter4 is the state where the animation ends
// parameter5
time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500);

// 讓整個網站的 enter key 無法使用
addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

// 防止 <form> 內部的 <button> 交出表單
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// 選擇 <select> 內的 <option> 之後，改變對應的顏色
let allSelects = document.querySelectorAll("select");
allSelects.forEach((select) => {
  select.addEventListener("change", (e) => {
    setGPA(); // 計算 GPA
    changeColor(e.target); // e.target 就是 <select>
  });
});

// 改變 credit，GPA也要更新
let credits = document.querySelectorAll(".class-credit");
credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

function changeColor(target) {
  switch (target.value) {
    case "A+":
    case "A":
    case "A-":
      target.style.backgroundColor = "lightgreen";
      target.style.color = "black";
      break;
    case "B+":
    case "B":
    case "B-":
      target.style.backgroundColor = "yellow";
      target.style.color = "black";
      break;
    case "C+":
    case "C":
    case "C-":
      target.style.backgroundColor = "orange";
      target.style.color = "black";
      break;
    case "D":
      target.style.backgroundColor = "red";
      target.style.color = "black";
      break;
    case "E":
      target.style.backgroundColor = "gray";
      target.style.color = "white";
      break;
    case "":
      target.style.backgroundColor = "white";
      target.style.color = "black";
      break;
    default:
      break;
  }
}

function setGPA() {
  let formLength = document.querySelectorAll("form").length;
  let credit = document.querySelectorAll(".class-credit");
  let selects = document.querySelectorAll("select");
  let sum = 0; // GPA 分子
  let creditSum = 0; // GPA 分母

  for (let i = 0; i < credit.length; i++) {
    if (!isNaN(credit[i].valueAsNumber)) {
      creditSum += credit[i].valueAsNumber;
    }
  }

  for (let i = 0; i < formLength; i++) {
    if (!isNaN(credit[i].valueAsNumber)) {
      sum += credit[i].valueAsNumber * convertor(selects[i].value);
    }
  }

  let result;
  if (creditSum == 0) {
    result = (0.0).toFixed(2);
  } else {
    result = (sum / creditSum).toFixed(2);
  }
  document.getElementById("result-gpa").innerText = result;
}

function convertor(grade) {
  switch (grade) {
    case "A+":
      return 4.5;
      break;
    case "A":
      return 4.0;
      break;
    case "A-":
      return 3.7;
      break;
    case "B+":
      return 3.3;
      break;
    case "B":
      return 3.0;
      break;
    case "B-":
      return 2.7;
      break;
    case "C+":
      return 2.5;
      break;
    case "C":
      return 2.3;
      break;
    case "C-":
      return 2.0;
      break;
    case "D":
      return 1.0;
      break;
    case "E":
      return 0.0;
      break;
  }
}
