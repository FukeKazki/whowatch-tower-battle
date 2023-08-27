import "@/styles/reset.css";
import "@/styles/style.css";
import "@/lib/pathseg.js";
// @ts-expect-error
import decomp from "poly-decomp";
import { Common } from "matter-js";
Common.setDecomp(decomp);

// import { ITEMS } from "./assets/items";
//
// const html = ITEMS.map((item) => {
//   return `<div class="item" style="width: 160px; height: 160px;"><img src="${item.url}" alt="${item.name}"></div>`
// })
// document.querySelector('body')!.innerHTML = `<div style="display: flex; flex-wrap: wrap;">${html.join('')}</div>`
