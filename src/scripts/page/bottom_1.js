import Scrollbar from "smooth-scrollbar"; //import with named import
import HeaderHandler from "../myclasses/header";
import bottom1PageHandler from "../myclasses/bottom1PagesHandler";

import { iNode, dom } from "../helper";

export default async function init({
  world,
  mouse,
  loader,
  viewport,
  scroller,
  theme,
  menu,
  clingHeader,
}) {
  const { header, fv, footer } = dom;

  const domManuipulator = new DOMManuipulatorClass(header, fv, footer);
  const headerHandler = new HeaderHandler(header);
  const pageHandler = new bottom1PageHandler(
    header,
    fv,
    footer,
    headerHandler,
    domManuipulator
  );
  pageHandler.init();

  const headerHeight = headerHandler.getHeaderHeight();

  domManuipulator.updateStyle(headerHeight);
}
