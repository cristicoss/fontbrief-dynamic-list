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

renderFonts().then(
  loadingConatainer.classList.add("hidden"),
  list.classList.remove("hidden")
);

console.log("live server");
