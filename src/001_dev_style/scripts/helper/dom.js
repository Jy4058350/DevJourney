import { iNode, config } from "../helper";

const dom = {
  canvas: iNode.qs(config.$.canvas),
  container: iNode.qs(config.$.globalContainer),
  page: iNode.qs(config.$.pageContainer),
  header: iNode.qs(config.$.header),
  fv: iNode.qs(config.$.fv),
  footer: iNode.qs(config.$.footer),

  btn: iNode.qs(config.$.btnMenu),
  inner: iNode.qs(config.$.btnMenuInner),
  wraps: iNode.qs(config.$.btnMenuWrap),
  bars: iNode.qs(config.$.btnMenuBar),
};

export { dom };
