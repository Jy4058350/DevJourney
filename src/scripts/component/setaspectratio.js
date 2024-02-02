import { iNode } from "../helper";

function setAspectRatio() {
  const container = iNode.qs(".aspect-ratio-container");
  const width = container.offsetWidth;
  console.log(width);
  const height = width / 16 * 9;
  console.log(height);
  console.log(container.offsetHeight);
  container.style.height = height + "px";

  //   console.log(container, "width=", width, "height=", height);
  const tex1 = container.getAttribute("data-tex-1");
  console.log(tex1);
}
// window.addEventListener('resize', setAspectRatio);

export { setAspectRatio };
