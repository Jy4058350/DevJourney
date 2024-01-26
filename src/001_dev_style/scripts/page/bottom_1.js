import Scrollbar from "smooth-scrollbar"; //import with named import
import DOMManuipulatorClass from "../myclasses/main";
import HeaderHandler from "../myclasses/header";
import PageHandler from "../myclasses/pagesHandler";

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
  const pageHandler = new PageHandler(
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
