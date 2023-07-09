"use strict";
/*
<link rel="stylesheet" href="http://127.0.0.1:5500/style-fontbrief.css" />
<script src="http://127.0.0.1:5500/fonts.js" defer></script>
<script src="http://127.0.0.1:5500/index.js" defer></script>
*/

const list = document.querySelector(".filter-dynamic-wrapper");
const loadingConatainer = document.querySelector(".loading_image");
// console.log(list);
list.innerHTML = "";
list.classList.add("hidden");

///build slug & take out commas////
async function renderFonts() {
  fonts.forEach((font) => {
    /////Build slugs////
    font.slug = font.name.split(" ").join("-").toLowerCase();
    console.log(font.slug);

    //// Take out commas////
    let p = [];
    font.attribute.forEach(function (a) {
      if (a !== ",") {
        p.push(`<p>${a}</p>`);
      }
    });
    const p2 = `${p}`.split(",").join("");

    const html = `
    <div id="imageFont" role="list" class="filter-dynamic-list w-dyn-items" style="">
    <div role="listitem" class="filter-dynamic-item w-dyn-item">
    <a href="https://fontbrief.webflow.io//fonts/${
      font.slug
    }" target="_blank" class="sort-button w-inline-block">
    <div class="div-block-158">
    <img src="${font.imgTitle}" loading="lazy" alt="${
      font.name
    }" class="image-f">
    </div>
    <div class="foundry-name">${font.foundry}</div>
    <div class="filters-hidden">
    <div class="foundry-ghost">
    ${font.foundry}
    </div>
    <div class="name-ghost">
    ${font.name}
    </div>
    <div class="attributes-ghost">
    ${p2}    
    </div>
    <div class="sans-serif">${font.sans}</div>
    <div class="workhorse">${
      font.workhorse !== "undefined" ? font.workhorse : ""
    }</div>
    <div class="free">${font.free}</div>
    </div>
    </a>
    </div>
    </div>
    `;

    list.insertAdjacentHTML("beforeend", html);
  });
}

function handleScroll() {
  // slider for increasing and decreasing the font size
  var inputRange = document.getElementsByClassName("range")[0],
    maxValue = 50, // the higher the smoother when dragging
    speed = 5,
    currValue,
    image = document.getElementsByClassName("collection-wrapper")[0],
    previousValue;

  //========= Inceput Cod pt sliderul de redimensionat===========
  // set min/max value
  inputRange.min = -50;
  inputRange.max = maxValue;
  previousValue = 0;
  image.style.width = 50 + "%";
  maxWidth = "100%";
  minWidth = "10%";

  // listen for unlock
  function unlockStartHandler() {
    // set to desired value
    currValue = +this.value;
  }

  function unlockEndHandler() {
    // store current value
    currValue = +this.value;
  }

  // bind events
  inputRange.addEventListener("mousedown", unlockStartHandler, false);
  inputRange.addEventListener("mousestart", unlockStartHandler, false);
  inputRange.addEventListener("mouseup", unlockEndHandler, false);
  inputRange.addEventListener("touchend", unlockEndHandler, false);

  // move gradient
  inputRange.addEventListener("input", function () {
    var currWidth = image.clientWidth;
    currValue = +this.value;
    //

    if (this.value > -50) {
      image.style.width = "27%";
    }
    if (this.value > -45) {
      image.style.width = "30%";
    }
    if (this.value > -40) {
      image.style.width = "33%";
    }
    if (this.value > -35) {
      image.style.width = "35%";
    }
    if (this.value > -30) {
      image.style.width = "40%";
    }
    if (this.value > -25) {
      image.style.width = "45%";
    }
    if (this.value > -20) {
      image.style.width = "50%";
    }
    if (this.value > -15) {
      image.style.width = "55%";
    }
    if (this.value > -10) {
      image.style.width = "60%";
    }
    if (this.value > -5) {
      image.style.width = "65%";
    }
    if (this.value > 0) {
      image.style.width = "70%";
    }
    if (this.value > 5) {
      image.style.width = "75%";
    }
    if (this.value > 10) {
      image.style.width = "78%";
    }
    if (this.value > 15) {
      image.style.width = "85%";
    }
    if (this.value > 20) {
      image.style.width = "90%";
    }
    if (this.value > 25) {
      image.style.width = "93%";
    }
    if (this.value > 30) {
      image.style.width = "95%";
    }
    if (this.value > 35) {
      image.style.width = "97%";
    }
    if (this.value > 40) {
      image.style.width = "100%";
    }
  });

  function myFunction(x) {
    if (x.matches) {
      //
      image.style.width = "100%";

      //
    } else {
      image.style.width = "50%";
    }
  }

  var x = window.matchMedia("(max-width: 700px)");
  myFunction(x); // Call listener function at run time
  x.addListener(myFunction);
}

renderFonts().then(
  loadingConatainer.classList.add("hidden"),
  list.classList.remove("hidden"),
  handleScroll()
);

console.log("live server");
