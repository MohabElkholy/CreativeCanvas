let viewportHeight = window.innerHeight;
let viewportWidth = window.innerWidth;
document.addEventListener("contextmenu", (event) => event.preventDefault());
let popSound = new Audio("pop.mp3");
let unpopSound = new Audio("unpop.mp3");
let colorSound = new Audio("color.mp3");
let soundCheck = document.getElementById("soundCheck");
let clearBtn = document.getElementById("clear");
let drawCheck = document.getElementById("drawCheck");
let done = document.getElementById("done");
let boxHight = 32;
let boxWidth = 32;
let boxDimations = 32;
let loadingScreen = document.querySelector(".loadingScreen");
let startmenu = document.querySelector(".starter");

function save() {
  const screenShotTarget = document.getElementById("capture");
  html2canvas(screenShotTarget).then((canvas) => {
    const base64img = canvas.toDataURL("image/png");
    var ancor = document.createElement("a");
    ancor.setAttribute("href", base64img);
    ancor.setAttribute("download", "CreativeCanvas.png");
    ancor.click();
    ancor.remove();
  });
}

let autoDraw = false;

done.addEventListener("click", () => {
  startmenu.classList.add("delete");
});

document.addEventListener("keydown", () => {
  autoDraw = true;
});

document.addEventListener("keyup", () => {
  autoDraw = false;
});

clearBtn.addEventListener("click", () => {
  console.log("cliced");
  allbox.forEach((box) => {
    box.style.backgroundColor = "white";
  });
});

let boxCloumns;

let reapet;

let main = document.querySelector("main");
main.style.gridTemplateColumns = reapet;

let boxes;

function updateSize() {
  if (
    document.getElementById("boxHeight").value === "" ||
    document.getElementById("boxWidth").value === "" ||
    document.getElementById("boxDimations").value === ""
  ) {
    alert("you have to set all inputs to number value");
  } else {
    boxHight = document.getElementById("boxHeight").value;
    boxWidth = document.getElementById("boxWidth").value;
    boxDimations = document.getElementById("boxDimations").value;

    setTimeout(setCloumns(), 1000);
  }
}

function setCloumns() {
  main.innerHTML = "";
  boxCloumns = Math.floor(viewportWidth / boxDimations);
  reapet = `repeat(${boxCloumns}, ${boxDimations}px)`;
  boxes = (viewportHeight / boxHight) * (viewportWidth / boxWidth);
  main.style.gridTemplateColumns = reapet;
  box.style.width = `${boxWidth}px`;
  box.style.height = `${boxHight}px`;
  setTimeout(render(), 1000);
}

let box = document.createElement("div");
box.classList.add("box");
box.style.width = `${boxWidth}px`;
box.style.height = `${boxHight}px`;
main.appendChild(box);

function render() {
  for (let index = 0; index < boxes; index++) {
    main.appendChild(box.cloneNode(true));
  }
  setTimeout(draw(), 1000);
}

let allbox;

let colorPicer = document.getElementById("colorChoice");
colorPicer.addEventListener("change", () => {
  color = colorPicer = document.getElementById("colorChoice").value;
});

let outlineCheck = document.getElementById("outlineCheck");
document.body.onload = () => {
  outlineCheck.checked = true;
};

function isOutline() {
  outlineCheck.addEventListener("click", () => {
    if (outlineCheck.checked === true) {
      allbox.forEach((box) => {
        box.style.border = "1px solid rgba(0, 0, 0, 0.10)";
      });
    } else {
      allbox.forEach((box) => {
        box.style.border = "none";
      });
    }
  });
}

let color = (colorPicer = document.getElementById("colorChoice").value);
// let color = prompt("enter your clolor");

let isMobile = "click";

if (/Android|iPhone/i.test(navigator.userAgent)) {
  isMobile = "touchstart";
}

setTimeout(() => {
  loadingScreen.classList.add("delete");
}, 1500);

function draw() {
  allbox = document.querySelectorAll(".box");
  allbox.forEach((box) => {
    box.addEventListener("wheel", (e) => {
      if (soundCheck.checked) colorSound.play();
      main.style.cursor =
        "url(https://cur.cursors-4u.net/cursors/cur-8/cur762.cur), auto";
      color = box.style.backgroundColor;
    });
    box.addEventListener("contextmenu", (e) => {
      if (soundCheck.checked) unpopSound.play();
      box.style.backgroundColor = "white";
      main.style.cursor =
        "url(http://www.rw-designer.com/cursor-extern.php?id=85157), auto";
    });
    box.addEventListener(isMobile, (e) => {
      if (soundCheck.checked) popSound.play();
      main.style.cursor =
        "url(https://cur.cursors-4u.net/cursors/cur-8/cur762.cur), auto";
      box.style.backgroundColor = color;

      let lastClick = 0;
      box.addEventListener("touchstart", function (e) {
        e.preventDefault(); // to disable browser default zoom on double tap
        let date = new Date();
        let time = date.getTime();
        const time_between_taps = 200; // 200ms
        if (time - lastClick < time_between_taps) {
          if (soundCheck.checked) unpopSound.play();
          box.style.backgroundColor = "white";
          console.log("done");
        }
        lastClick = time;
      });
    });
  });
  setTimeout(drawAuto(), 1000);
  setTimeout(isOutline(), 1000);
}

setCloumns();

function drawAuto() {
  allbox.forEach((box) => {
    box.addEventListener("mouseenter", (e) => {
      box.style.border = "2px dotted rgba(0, 0, 0, 0.5)";
      if (autoDraw) {
        main.style.cursor =
          "url(https://cur.cursors-4u.net/cursors/cur-8/cur762.cur), auto";
        box.style.backgroundColor = color;
      }
    });

    box.addEventListener("mouseleave", () => {
      if (outlineCheck.checked) {
        box.style.border = "1px solid rgba(0, 0, 0, 0.10)";
      } else {
        box.style.border = "none";
      }
    });
  });
}
