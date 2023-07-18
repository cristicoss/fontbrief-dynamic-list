"use strict";

const lisWrapper = document.querySelector(".filter-dynamic-wrapper");
const list = document.querySelector(".filter-dynamic-list");
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
    this._checkUncheck();
    resetBtn.addEventListener("click", () => this._reset());
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, this._readUrl)
    );
    this._paginate(fonts);
    this._pagBtnHandler(fonts);
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
      ////Build html to render////
      const html = `
      <div role="listitem" class="filter-dynamic-item w-dyn-item">
      <a href="https://fontbrief.webflow.io//fonts/${
        font.slug
      }" target="_blank" class="sort-button w-inline-block">
      <div class="div-block-158">
      <img src="${font.imgTitle}" ${
        fonts.indexOf(font) === 0 ||
        fonts.indexOf(font) === 1 ||
        fonts.indexOf(font) === 2 ||
        fonts.indexOf(font) === 3 ||
        fonts.indexOf(font) === 4
          ? ""
          : "loading=lazy"
      }" alt="${font.name}" class="image-f">
      </div>
      <div class="foundry-name">${font.foundry}</div>
      </a>
      </div>
      `;

      list.insertAdjacentHTML("beforeend", html);
    });
    ////Animate items////
    window.scrollTo({ top: 0, behavior: "smooth" });
    this._showItemsWithFadeIn();
  }

  _showItemsWithFadeIn() {
    const it = document.querySelectorAll(".w-dyn-item");

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
    const url = new URL(window.location.href);
    url.hash = "";
    history.pushState(null, null, url.toString().replace(/,/g, ""));
    // this._readUrl();
    this._readUrl();
    this.hashFragment = [];
  }

  //////// Check - uncheck filters  //////////
  _checkUncheck = () => {
    checkboxesContainer.forEach((check) => {
      check.addEventListener("click", (e) => {
        console.log(window.location.hash.slice(1));
        const uncheck = check.querySelector(".uncheck");

        const allCheckboxes = [...check.querySelectorAll(".checkbox_filtru")];
        let arrToFilter = [];
        const currCheckbox = e.target.closest(".checkbox_filtru");
        if (!currCheckbox) return;

        arrToFilter.push(currCheckbox.dataset.atr);

        if (currCheckbox.classList.contains("checkbox_color-blue")) {
          //   currCheckbox.classList.remove("checkbox_color-blue");

          this._updateUrl(e.target.dataset.atr.slice(0, -1) + "x");

          return;
        } else {
          //   currCheckbox.classList.add("checkbox_color-blue");

          allCheckboxes.forEach((active) => {
            if (
              active.classList.contains("checkbox_color-blue") &&
              active !== currCheckbox
            ) {
              //   uncheck.classList.remove("hidden");
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
                  //   allCheckboxes[i].classList.remove("checkbox_color-blue");
                  //   allCheckboxes[i].classList.add("checkbox_color-blue");
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
                  //   allCheckboxes[i].classList.remove("checkbox_color-blue");
                  //   allCheckboxes[i].classList.add("checkbox_color-blue");
                  arrToFilter.push(allCheckboxes[i].dataset.atr);
                }
              }
            }
          });
        }
        // Uncheck all
        uncheck.addEventListener("click", (e) => {
          //   for (let i = 0; i <= 4; i++)
          //     allCheckboxes[i].classList.remove("checkbox_color-blue");
          uncheck.classList.add("hidden");
          this._updateUrl(e.target.dataset.atr);
          return;
        });
        const uniqueArrToFilter = [...new Set(arrToFilter)];
        this._updateUrl(uniqueArrToFilter);
        console.log(uniqueArrToFilter);
      });
    });
  };

  //// Update Window URL ////
  _updateUrl = (str) => {
    if (!str) {
      this._readUrl();
      return;
    }
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
    this._readUrl();
  };

  _readUrl = () => {
    const selection = window.location.hash.slice(1);
    this._filterFonts(selection);
    this._updateFilters(selection.match(/.{1,2}/g));
  };

  _updateFilters(array) {
    allCheckboxes.forEach(function (box) {
      if (!array) {
        box.classList.remove("checkbox_color-blue");
        allUncheck.forEach(function (uncheck) {
          uncheck.classList.remove("hidden");
          uncheck.classList.add("hidden");
        });
        return;
      }

      box.classList.remove("checkbox_color-blue");
      if (array.includes(box.dataset.atr)) {
        box.classList.add("checkbox_color-blue");
      }
    });
  }

  //// FILTER through the fonts /////
  _filterFonts = (str) => {
    // if (!str) return;

    function getCombinations(regex) {
      return (str) => {
        const matches = str.match(regex) || [];
        return matches.map((match) => match[0] + match[1]).join("");
      };
    }

    ///// Get filters from url/////
    const expr = getCombinations(/1[a-z]/g)(str)
      ? getCombinations(/1[a-z]/g)(str)
      : "1a1i1o1m1j";

    const elgnt = getCombinations(/2[a-z]/g)(str)
      ? getCombinations(/2[a-z]/g)(str)
      : "2a2i2o2m2j";

    const frndl = getCombinations(/3[a-z]/g)(str)
      ? getCombinations(/3[a-z]/g)(str)
      : "3a3i3o3m3j";

    const orgnc = getCombinations(/4[a-z]/g)(str)
      ? getCombinations(/4[a-z]/g)(str)
      : "4a4i4o4m4j";

    const prgrssv = getCombinations(/5[a-z]/g)(str)
      ? getCombinations(/5[a-z]/g)(str)
      : "5a5i5o5m5j";

    const drng = getCombinations(/6[a-z]/g)(str)
      ? getCombinations(/6[a-z]/g)(str)
      : "6a6i6o6m6j";

    const dscrt = getCombinations(/7[a-z]/g)(str)
      ? getCombinations(/7[a-z]/g)(str)
      : "7a7i7o7m7j";

    const wrm = getCombinations(/8[a-z]/g)(str)
      ? getCombinations(/8[a-z]/g)(str)
      : "8a8i8o8m8j";

    const filteredFonts = fonts.filter(
      (font) =>
        font.expressive.some((res) => expr.includes(res)) &&
        font.elegant.some((res) => elgnt.includes(res)) &&
        font.friendly.some((res) => frndl.includes(res)) &&
        font.organic.some((res) => orgnc.includes(res)) &&
        font.progressive.some((res) => prgrssv.includes(res)) &&
        font.daring.some((res) => drng.includes(res)) &&
        font.discreet.some((res) => dscrt.includes(res)) &&
        font.warm.some((res) => wrm.includes(res))
    );
    this._renderFonts(filteredFonts);
    this._paginate(filteredFonts);
    this._pagBtnHandler(filteredFonts);
  };
}

const app = new App();
