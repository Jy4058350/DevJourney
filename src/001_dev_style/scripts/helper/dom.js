import { iNode, config } from "../helper";

const dom = {
  // common
  canvas: iNode.qs(config.$.canvas),
  container: iNode.qs(config.$.globalContainer),
  page: iNode.qs(config.$.pageContainer),
  header: iNode.qs(config.$.header),
  fv: iNode.qs(config.$.fv),
  footer: iNode.qs(config.$.footer),

  // menu
  btn: iNode.qs(config.$.btnMenu),
  inner: iNode.qs(config.$.btnMenuInner),
  wraps: iNode.qs(config.$.btnMenuWrap),
  bars: iNode.qs(config.$.btnMenuBar),

  //bottom-1
  pageHeader: iNode.qs(".PageHeader"),
  pageWrapper: iNode.qs(".PageHeader__ImageWrapper"),
  rte: iNode.qs(".Rte"),
  imgContrast: iNode.qs(".Image--contrast"),

  // header
  headerFlexItem: iNode.qs(config.header.flexItem),
  headerEntrance: iNode.qs(config.header.entrance),
  headerMainNav: iNode.qs(config.header.mainnav),
  headerSecondNav: iNode.qs(config.header.secondNav),
  headerHorizontalList: iNode.qs(config.header.horizontalList),
  headerIcon: iNode.qs(config.header.icon),
  headerWrap: iNode.qs(config.header.wrap),
  headerLogoGray: iNode.qs(config.header.logoGray),
  headerLogoWhite: iNode.qs(config.header.logoWhite),
  headerBtnBars: iNode.qs(config.header.btnBars),
  
};

export { dom };
