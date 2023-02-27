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
let allSelects = document.querySelectorAll("select"); // static NodeList
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

let addButton = document.querySelector(".plus-btn");
addButton.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");

  // 製作表單內 input
  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("list", "opt");
  newInput1.classList.add("class-type");
  newInput1.setAttribute("placeholder", "class category");

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.classList.add("class-number");
  newInput2.setAttribute("placeholder", "class number");

  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.classList.add("class-credit");
  newInput3.setAttribute("placeholder", "credits");
  newInput3.addEventListener("change", () => {
    setGPA();
  });

  // select tag
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");
  newSelect.setAttribute("name", "select");

  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);

  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A+");
  let textNode2 = document.createTextNode("A+");
  opt2.appendChild(textNode2);

  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A");
  let textNode3 = document.createTextNode("A");
  opt3.appendChild(textNode3);

  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "A-");
  let textNode4 = document.createTextNode("A-");
  opt4.appendChild(textNode4);

  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B+");
  let textNode5 = document.createTextNode("B+");
  opt5.appendChild(textNode5);

  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B");
  let textNode6 = document.createTextNode("B");
  opt6.appendChild(textNode6);

  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "B-");
  let textNode7 = document.createTextNode("B-");
  opt7.appendChild(textNode7);

  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C+");
  let textNode8 = document.createTextNode("C+");
  opt8.appendChild(textNode8);

  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C");
  let textNode9 = document.createTextNode("C");
  opt9.appendChild(textNode9);

  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "C-");
  let textNode10 = document.createTextNode("C-");
  opt10.appendChild(textNode10);

  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);

  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "E");
  let textNode12 = document.createTextNode("E");
  opt12.appendChild(textNode12);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);

  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });

  // trash button
  let newButton = document.createElement("button");
  newButton.classList.add("trash");
  let newItag = document.createElement("i");
  newItag.classList.add("fas");
  newItag.classList.add("fa-trash");
  newButton.appendChild(newItag);
  newButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        setGPA();
      }
    );
  });

  // 將元素成為 div.grader 的子元素
  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);

  newForm.appendChild(newDiv);
  document.querySelector(".all-inputs").appendChild(newForm);
  newForm.style.animation = "scaleUp 0.5s ease forwards"; // new form 出現時的動畫
});

// 按下 trash 按鈕，刪掉 form
let allTrash = document.querySelectorAll(".trash");
allTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        setGPA();
      }
    );
  });
});
