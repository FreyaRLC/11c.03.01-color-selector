"use strict";
const theInput = document.querySelector("#color_input");
const theColor = theInput.value;
// let h, s, l;
document.addEventListener("DOMContentLoaded", init);

function init() {
  theInput.addEventListener("input", trainStation);
  //   console.log(theInput.value);
}

function trainStation() {
  showHEX(theInput.value);
  //   console.log(theInput.value);
}

function showHEX(hex) {
  document.querySelector("#hex").textContent += ` ${theInput.value}`;
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5), 16);
  showRBG(r, g, b);
}

function showRBG(r, g, b) {
  document.querySelector("#rgb").textContent += ` ${r}, ${g}, ${b}`;
  //   r = r.toString(16).padStart(2, "0");
  //   g = g.toString(16).padStart(2, "0");
  //   b = b.toString(16).padStart(2, "0");
  //   console.log(`#${r}${g}${b}`);
  convertToHSL(r, g, b);
}

function convertToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  //   console.log(`${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%`); // just for testing
  showHSL(h, s, l);
}

function showHSL(h, s, l) {
  document.querySelector("#hsl").textContent += ` ${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%`;
}
