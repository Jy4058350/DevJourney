import { iNode } from "../helper";
import { elementPos } from "./elementpos";

const $ = {};

// Code for home.js only
async function setRotationViewportHeight() {
  $.rotationViewport = iNode.qs(".rotation-viewport");
  const homeNewsHeight = await elementPos.getHomeNewsHeight();

  $.rotationViewport.style.height = iNode.setHeightPx(
    $.rotationViewport,
    homeNewsHeight
  );
}

export { setRotationViewportHeight };
