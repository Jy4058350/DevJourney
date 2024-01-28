const config = {
  // Setting of key ID attributes in HTML
  //(selectors in styles/parts/_common.scss must also be changed)
  $: {
    canvas: "#canvas",
    globalContainer: "#globalContainer",
    pageContainer: "#pageContainer",
    header: "#header",
    main: "#main",
    fv: "#fv",
    footer: "#footer",

    btnMenu: ".btn-menu",
    btnMenuInner: ".btn-menu_inner",
    btnMenuWrap: ".btn-menu_wrap",
    btnMenuBar: ".btn-menu_bar",

    //bottom-1
    pageHeader: ".PageHeader",
    pageWrapper: ".PageHeader__ImageWrapper",
    rte: ".Rte",
    imgContrast: ".Image--contrast",
  },

  header: {
    flexItem: ".Header__FlexItem--logo",
    entrance: ".btn-menu.Header__Entrance",
    mainnav: ".Header__MainNav",
    secondNav: ".Header__secondaryNav",
    horizontalList: ".HorizontalList",
    icon: ".Header__Icon",
    wrap: ".Header__Wrap",
    logoGray: ".Logo__gray",
    logoWhite: ".Logo__white",
    btnBars: ".btn-menu_bar",
  },

  // rotationSlider get element
  flex: {
    indicator: ".home-news-rotation-wrap",
    target: ".home-news-article-thumbnail",
  },

  prefix: {
    glsl: "webgl",
  },

  event: {
    click: "pointerdown",
    mouseenter: "mouseenter",
  },
};

export { config };
