"use strict";
// let h, s, l;
document.addEventListener("DOMContentLoaded", init);

function init() {
  document.querySelector("#color_input").addEventListener("input", getInput);
}

function getInput() {
  const theInput = document.querySelector("#color_input");
  trainStation(theInput.value);
}

function trainStation(inputValue) {
  let rgbValue = hexToRGB(inputValue);
  let hslValue = rgbToHSL(rgbValue);
  let cssValue = rgbToCSS(rgbValue);
  let hexValue = inputValue;
  showRBG(rgbValue);
  showHSL(hslValue);
  showCSS(cssValue);
  showHEX(hexValue);
}

function showHEX(hex) {
  document.querySelector("#hex").textContent = `hex: ${hex}`;
}

function showRBG(rgb) {
  //   console.log(rgb);
  document.querySelector("#rgb").textContent = `rgb: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

function showHSL(hsl) {
  document.querySelector("#hsl").textContent = `hsl: ${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%`;
}

function showCSS(css) {
  document.querySelector(".colored_box").style.backgroundColor = css;
}

function hexToRGB(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5), 16);
  return {r, g, b};
}
function rgbToCSS(rgb) {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function rgbToHSL(rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;

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

  // console.log(`${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%`); // just for testing
  return {h, s, l};
}

function rgbToHex(rgb) {
  // console.log(rgb);
  rgb.r = rgb.r.toString(16).padStart(2, "0");
  rgb.g = rgb.g.toString(16).padStart(2, "0");
  rgb.b = rgb.b.toString(16).padStart(2, "0");
  return `#${rgb.r}${rgb.g}${rgb.b}`;
}
