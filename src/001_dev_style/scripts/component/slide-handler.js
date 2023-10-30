import world from "../glsl/world.js";
import { gsapActive} from "../helper/gsap.js";

function slideHandler(slideSelect, textSelect) {
  const slide = world.getOs(slideSelect);
  const text = world.getOs(textSelect);
  gsapActive();

  function goToNext(index) {
    slide.goToNext(index);
    text.goToNext(index);
  }
}

export { slideHandler };
