import world from "../glsl/world.js";

function slideHandler(slideSelect, textSelect) {
  const slide = world.getOs(slideSelect);
  const text = world.getOs(textSelect);

  console.log("slide", slide);
  console.log("text", text);
}

export { slideHandler };
