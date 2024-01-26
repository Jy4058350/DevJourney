const config = {
  // Setting of key ID attributes in HTML
  //(selectors in styles/parts/_common.scss must also be changed)
  $: {
    canvas: "#canvas",
    globalContainer: "#globalContainer",
    pageContainer: "#pageContainer",
    header: "#header",
    main: "#main",
    footer: "#footer",

    btnMenu: ".btn-menu",
    btnMenuInner: ".btn-menu_inner",
    btnMenuWrap: ".btn-menu_wrap",
    btnMenuBar: ".btn-menu_bar",
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
