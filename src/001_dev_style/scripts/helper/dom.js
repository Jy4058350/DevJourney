import { iNode, config } from "../helper";

const dom = {
  container: iNode.qs(config.$.globalContainer),
  page: iNode.qs(config.$.pageContainer),

  btn: iNode.qs(config.$.btnMenu),
  inner: iNode.qs(config.$.btnMenuInner),
  wraps: iNode.qs(config.$.btnMenuWrap),
  bars: iNode.qs(config.$.btnMenuBar),
};

export { dom };
