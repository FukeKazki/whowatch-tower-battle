import {
  Engine,
  Render,
  Runner,
  Bodies,
  Body,
  Composite,
  Events,
  Vector,
} from "matter-js";
import {
  getObjectWidth,
  isMobileDevice,
  setPositionFromTopLeft,
} from "@/helper";
import MoriagePng from "@/assets/whowatch/moriage.png"
import KitunePng from "@/assets/whowatch/kitune.png"
import KumachanPng from "@/assets/whowatch/kumachan.png"
import ObakePng from "@/assets/whowatch/obake.png"
import WhowatchkunNuigurumiPng from "@/assets/whowatch/whowatchkun-nuigurumi.png"
import ArupakaPng from "@/assets/whowatch/arupaka.png"
import CoolPng from "@/assets/whowatch/cool.png"
import CutePng from "@/assets/whowatch/cute.png"
import FreePng from "@/assets/whowatch/free.png"
import GoldKumachanPng from "@/assets/whowatch/gold_kumachan.png"
import JewelryBearPng from "@/assets/whowatch/jewelry_bear.png"
import KoaraPng from "@/assets/whowatch/koara.png"
import KumachanGiraffePng from "@/assets/whowatch/kumachan-giraffe.png"
import KumachanLeopardPng from "@/assets/whowatch/kumachan-leopard.png"
import KumachanTigerPng from "@/assets/whowatch/kumachan-tiger.png"
import MedetaiPng from "@/assets/whowatch/medetai.png"
import MoriagenekoEmeraldPng from "@/assets/whowatch/moriageneko-emerald.png"
import MoriagenekoRubyPng from "@/assets/whowatch/moriageneko-ruby.png"
import MoriagenekoSapphirePng from "@/assets/whowatch/moriageneko-sapphire.png"
import data from "@/assets/data.json"

const engine = Engine.create();

const aspectRatio = 320 / 568;

// ビューポートのサイズを取得
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

// canvas のサイズを計算
let canvasWidth: number, canvasHeight: number;
if (viewportWidth / viewportHeight > aspectRatio) {
  canvasHeight = viewportHeight;
  canvasWidth = canvasHeight * aspectRatio;
} else {
  canvasWidth = viewportWidth;
  canvasHeight = canvasWidth / aspectRatio;
}

const app = document.getElementById("app")!;
app.style.width = `${canvasWidth}px`;
app.style.height = `${canvasHeight}px`;

const logo = document.getElementById("logo")!;
const startButton = document.getElementById("start")!;
const cover = document.getElementById("cover")!;
startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  logo.style.display = "none";
  cover.style.display = "none";
});

const render = Render.create({
  element: document.getElementById("app")!,
  engine: engine,
  options: {
    width: canvasWidth,
    height: canvasHeight,
    background: "#83DFF3",
    wireframes: false,
    // showVelocity: true,
    // showCollisions: true,
  },
});

Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);

const ground = Bodies.rectangle(0, 0, canvasWidth - 80, 32, {
  isStatic: true,
  render: {
    fillStyle: "#44AD33",
  },
  friction: 1,
  restitution: 0,
});
setPositionFromTopLeft(
  ground,
  // center
  (canvasWidth - getObjectWidth(ground)) / 2,
  canvasHeight - 104,
);

Composite.add(engine.world, ground);

let placeholderPosition = { x: 100, y: 100 };
const handleMove = (event: TouchEvent | MouseEvent) => {
  if (event.type === "touchmove") {
    event.preventDefault();
    // @ts-ignore
    var touch = event.touches[0];
    const rect = render.canvas.getBoundingClientRect();
    const scaleX = render.canvas.width / rect.width;
    const mouseX = (touch.clientX - rect.left) * scaleX;

    placeholderPosition = { x: mouseX, y: 100 };
  } else {
    const rect = render.canvas.getBoundingClientRect();
    const scaleX = render.canvas.width / rect.width;
    // @ts-ignore
    const mouseX = (event.clientX - rect.left) * scaleX;

    placeholderPosition = { x: mouseX, y: 100 };
  }
};
render.canvas.addEventListener("touchmove", handleMove);
if (!isMobileDevice()) {
  render.canvas.addEventListener("mousemove", handleMove);
}

let index = 0;
const images = [
  MoriagePng,
  KitunePng,
  KumachanPng,
  ObakePng,
  WhowatchkunNuigurumiPng,
  ArupakaPng,
  CoolPng,
  CutePng,
  FreePng,
  GoldKumachanPng,
  JewelryBearPng,
  KoaraPng,
  KumachanGiraffePng,
  KumachanLeopardPng,
  KumachanTigerPng,
  MedetaiPng,
  MoriagenekoEmeraldPng,
  MoriagenekoRubyPng,
  MoriagenekoSapphirePng,
];
Events.on(render, "afterRender", function() {
  if (placeholderPosition) {
    var context = render.context;
    const imageData = images[index % images.length];
    const image = new Image();
    image.src = imageData;
    const scale = 0.4;
    context.globalAlpha = 0.5;
    context.drawImage(
      image,
      placeholderPosition.x - (image.width / 2) * scale,
      placeholderPosition.y - (image.height / 2) * scale,
      image.width * scale,
      image.height * scale,
    );
    context.globalAlpha = 1;
  }
});

let moriageVertices: Vector[][] | undefined;
let kituneVertices: Vector[][] | undefined;
let kumachanVertices: Vector[][] | undefined;
let obakeVertices: Vector[][] | undefined;
let whowatchkunNuigurumiVertices: Vector[][] | undefined;
let arupakaVertices: Vector[][] | undefined;
let coolVertices: Vector[][] | undefined;
let cuteVertices: Vector[][] | undefined;
let freeVertices: Vector[][] | undefined;
let goldKumachanVertices: Vector[][] | undefined;
let jewelryBearVertices: Vector[][] | undefined;
let koaraVertices: Vector[][] | undefined;
let kumachanGiraffeVertices: Vector[][] | undefined;
let kumachanLeopardVertices: Vector[][] | undefined;
let kumachanTigerVertices: Vector[][] | undefined;
let medetaiVertices: Vector[][] | undefined;
let moriagenekoEmeraldVertices: Vector[][] | undefined;
let moriagenekoRubyVertices: Vector[][] | undefined;
let moriagenekoSapphireVertices: Vector[][] | undefined;

(async function() {
  console.log("init!");
  moriageVertices = data.moriage;
  kituneVertices = data.kitune;
  kumachanVertices = data.kumachan;
  obakeVertices = data.obake;
  whowatchkunNuigurumiVertices = data[
    "whowatchkun-nuigurumi"
  ];
  arupakaVertices = data.arupaka;
  coolVertices = data.cool;
  cuteVertices = data.cute;
  freeVertices = data.free;
  goldKumachanVertices = data["gold-kumachan"];
  jewelryBearVertices = data["jewelry-bear"];
  koaraVertices = data.koara;
  kumachanGiraffeVertices = data["kumachan-giraffe"];
  kumachanLeopardVertices = data["kumachan-leopard"];
  kumachanTigerVertices = data["kumachan-tiger"];
  medetaiVertices = data.medetai;
  moriagenekoEmeraldVertices = data["moriageneko-emerald"];
  moriagenekoRubyVertices = data["moriageneko-ruby"];
  moriagenekoSapphireVertices = data["moriageneko-sapphire"];

  console.log("loaded");
})();

const createBox = (
  x: number,
  y: number,
  vertices: Vector[][],
  texture: string,
) => {
  const box = Bodies.fromVertices(x, y, vertices, {
    label: "box",
    render: {
      sprite: {
        single: true,
        texture: texture,
        xScale: 0.4,
        yScale: 0.4,
      },
    },
    friction: 1,
    frictionAir: 0.05,
    restitution: 0.1,
  });
  Body.scale(box, 0.4, 0.4);
  return box;
};
const handleTouch = () => {
  const vertices = [
    moriageVertices,
    kituneVertices,
    kumachanVertices,
    obakeVertices,
    whowatchkunNuigurumiVertices,
    arupakaVertices,
    coolVertices,
    cuteVertices,
    freeVertices,
    goldKumachanVertices,
    jewelryBearVertices,
    koaraVertices,
    kumachanGiraffeVertices,
    kumachanLeopardVertices,
    kumachanTigerVertices,
    medetaiVertices,
    moriagenekoEmeraldVertices,
    moriagenekoRubyVertices,
    moriagenekoSapphireVertices,
  ][index % 19];
  const image = images[index % 19];
  if (!vertices) return;
  const box = createBox(
    placeholderPosition.x,
    placeholderPosition.y,
    vertices,
    image,
  );
  Composite.add(engine.world, box);
  index++;
};
render.canvas.addEventListener("touchend", handleTouch);
if (!isMobileDevice()) {
  render.canvas.addEventListener("mouseup", handleTouch);
}

Events.on(engine, "beforeUpdate", function() {
  let allBodies = Composite.allBodies(engine.world);
  allBodies = allBodies.filter((body) => body.label === "box");
  if (!allBodies) return;
});
Events.on(engine, "afterUpdate", function() {
  checkIfBoxesFell();
});
let count = 0;
const countElement = document.getElementById("count");

function checkIfBoxesFell() {
  // エンジンの世界にあるすべての物体を取得
  var bodies = Composite.allBodies(engine.world);
  count = bodies.filter((v) => v.label === "box").length;
  countElement!.innerHTML = count.toString();

  bodies.forEach(function(body) {
    // 床のY座標よりも下にある場合
    if (body.position.y > ground.position.y) {
      // ボックスが床から落ちたと判定
      // 必要に応じて、ボックスを世界から削除
      Composite.remove(engine.world, body);
    }
  });
}
