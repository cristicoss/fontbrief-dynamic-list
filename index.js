"use strict";

const list = document.querySelector(".filter-dynamic-wrapper");
const loadingConatainer = document.querySelector(".loading_image");
const pagContainer = document.querySelector(".pagination_container");
const btnPag = document.querySelectorAll(".pagination_text");
const allCheckboxes = document.querySelectorAll(".checkbox_filtru");
const resetBtn = document.querySelector(".reset-btn");
const allUncheck = document.querySelectorAll(".uncheck");
const itemsPerPage = 50;

const checkboxesContainer = document.querySelectorAll(".filtre-schimbatoare");

class App {
  fonts = fonts;
  hashFragment = [];
  constructor() {
    this._paginate(fonts);
    this._renderFonts(fonts);
    this._pagBtnHandler(fonts);
    this._checkUncheck();
    resetBtn.addEventListener("click", () => this._reset());
  }

  //////// Implement pagination //////////
  _paginate = function (array, pageNr = 1) {
    const generatePagNr = function (nrPages, pageNr) {
      for (let i = 1; i <= nrPages; i++) {
        const htmlNumbers = `<span class="pagination_text ${
          pageNr === i ? "text_color-blue" : ""
        }" data-goto="${i}">${i}</span>`;
        pagContainer.insertAdjacentHTML("beforeend", htmlNumbers);
      }
    };
    pagContainer.innerHTML = "";
    const nrPages = Math.ceil(array.length / itemsPerPage);
    const htmlNext = `<span class="pagination_text" data-goto="${
      pageNr + 1
    }">Next</span>`;
    const htmlPrev = `<span class="pagination_text" data-goto="${
      pageNr - 1
    }">Previous</span>`;

    // If we are on the first page & there are more page
    if (pageNr === 1 && nrPages > 1) {
      generatePagNr(nrPages, pageNr);
      pagContainer.insertAdjacentHTML("beforeend", htmlNext);
    }

    // If we are on the last page & there are more page
    if (pageNr === nrPages && nrPages > 1) {
      pagContainer.insertAdjacentHTML("beforeend", htmlPrev);
      generatePagNr(nrPages, pageNr);
    }

    //If we are in the middle
    if (pageNr < nrPages && pageNr !== 1) {
      pagContainer.insertAdjacentHTML("beforeend", htmlPrev);
      generatePagNr(nrPages, pageNr);
      pagContainer.insertAdjacentHTML("beforeend", htmlNext);
    }
    if (nrPages === 1) pagContainer.innerHTML = "";
  };

  //////// Handle click page //////////
  _pagBtnHandler = (fonts) => {
    pagContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".pagination_text");
      if (!btn) return;
      const pagNr = +btn.dataset.goto;

      const arrRange = fonts.slice(
        (pagNr - 1) * itemsPerPage,
        (pagNr - 1) * itemsPerPage + itemsPerPage
      );
      this._renderFonts(arrRange);
      this._paginate(fonts, +pagNr);
    });
  };

  ////// Render list of fonts /////
  async _renderFonts(fonts) {
    const newFonts = fonts.slice(0, itemsPerPage);
    list.innerHTML = "";
    newFonts.forEach((font) => {
      /////Build slugs////
      font.slug = font.name.split(" ").join("-").toLowerCase();

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
      <a href="https://fontbrief.webflow.io//fonts/${font.slug}" target="_blank" class="sort-button w-inline-block">
      <div class="div-block-158">
      <img src="${font.imgTitle}" loading="lazy" alt="${font.name}" class="image-f">
      </div>
      <div class="foundry-name">${font.foundry}</div>
      </a>
      </div>
      </div>
      `;

      list.insertAdjacentHTML("beforeend", html);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    this._showItemsWithFadeIn();
  }

  _showItemsWithFadeIn() {
    const it = document.querySelectorAll(".w-dyn-items");

    loadingConatainer.classList.add("hidden");
    // list.classList.remove("hidden");
    it.forEach((item, index) => {
      item.classList.remove("visible");
      setTimeout(() => {
        item.classList.add("visible");
      }, index * 100); // Delay each item's appearance by 100ms
    });
  }

  _reset() {
    this._renderFonts(this.fonts);
    this._paginate(fonts);
    this._pagBtnHandler(fonts);
    allCheckboxes.forEach(function (c) {
      c.classList.remove("checkbox_color-blue");
    });
    allUncheck.forEach(function (u) {
      u.classList.add("hidden");
    });
  }

  //////// Check - uncheck filters  //////////
  _checkUncheck = (fonts) => {
    checkboxesContainer.forEach((check) => {
      const uncheck = check.querySelector(".uncheck");
      check.addEventListener("click", (e) => {
        const allCheckboxes = [...check.querySelectorAll(".checkbox_filtru")];
        // console.log(allCheckboxes);
        const currCheckbox = e.target.closest(".checkbox_filtru");
        if (!currCheckbox) return;

        const arrToFilter = [];
        arrToFilter.push(currCheckbox.dataset.atr);

        if (currCheckbox.classList.contains("checkbox_color-blue")) {
          currCheckbox.classList.remove("checkbox_color-blue");
          allCheckboxes.forEach(function (c) {
            arrToFilter.push(c.dataset.atr);
          });
          arrToFilter;
        } else {
          currCheckbox.classList.add("checkbox_color-blue");

          allCheckboxes.forEach((active) => {
            if (
              active.classList.contains("checkbox_color-blue") &&
              active !== currCheckbox
            ) {
              uncheck.classList.remove("hidden");
              // if first box is before the last box
              if (
                allCheckboxes.indexOf(active) <
                allCheckboxes.indexOf(currCheckbox)
              ) {
                for (
                  let i = allCheckboxes.indexOf(active);
                  i <= allCheckboxes.indexOf(currCheckbox);
                  i++
                ) {
                  allCheckboxes[i].classList.remove("checkbox_color-blue");
                  allCheckboxes[i].classList.add("checkbox_color-blue");
                  arrToFilter.push(allCheckboxes[i].dataset.atr);
                }
              }

              // if first box is after the last box
              if (
                allCheckboxes.indexOf(active) >
                allCheckboxes.indexOf(currCheckbox)
              ) {
                for (
                  let i = allCheckboxes.indexOf(currCheckbox);
                  i <= allCheckboxes.indexOf(active);
                  i++
                ) {
                  allCheckboxes[i].classList.remove("checkbox_color-blue");
                  allCheckboxes[i].classList.add("checkbox_color-blue");
                  arrToFilter.push(allCheckboxes[i].dataset.atr);
                }
              }
            }
          });
        }
        // Uncheck all
        uncheck.addEventListener("click", (e) => {
          for (let i = 0; i <= 4; i++)
            allCheckboxes[i].classList.remove("checkbox_color-blue");
          uncheck.classList.add("hidden");
          this._renderFonts(this.fonts);
          this._paginate(this.fonts);
          this._pagBtnHandler(this.fonts);
          //   console.log(e.target);
          this._updateUrl(e.target.dataset.atr);

          return;
        });
        const uniqueArrToFilter = [...new Set(arrToFilter)];
        // console.log(uniqueArrToFilter);
        this._filterFonts(uniqueArrToFilter);
        this._updateUrl(uniqueArrToFilter);
      });
    });
  };

  //// Update Window URL ////
  _updateUrl = (str) => {
    if (str.toString().endsWith("x")) {
      this.hashFragment = this.hashFragment.filter(
        (item) => !item.includes(str[0])
      );
    } else {
      this.hashFragment = Array.from(new Set(this.hashFragment.concat(str)));
    }

    const url = new URL(window.location.href);
    url.hash = this.hashFragment;
    history.pushState(null, null, url.toString().replace(/,/g, ""));
  };
  //// FILTER through the fonts /////
  _filterFonts = (arr) => {
    const filteredFonts = fonts.filter((font) =>
      font.expressive.some((res) => arr.includes(res))
    );
    this._renderFonts(filteredFonts);
    this._paginate(filteredFonts);
    this._pagBtnHandler(filteredFonts);
  };
}

const app = new App();
