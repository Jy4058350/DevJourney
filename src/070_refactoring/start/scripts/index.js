import "../styles/style.scss";

import { init } from "./bootstrap";
import world from "./glsl/world";
import { viewport } from "./helper/viewport";

init();
const canvas = document.querySelector("#canvas");
const canvasRect = canvas.getBoundingClientRect();

viewport.init(canvasRect);

world.render();
