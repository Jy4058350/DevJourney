import { iNode } from "./iNode.js";

const headerAction = {
  init: function () {
    const hovered = iNode.qsa(".hovered");
    const openSubmenu = iNode.qs(".open-submenu");
    const header = iNode.qs(".header");
    const dev = iNode.qs(".dev");
    const account = iNode.qs(".account");

    hovered.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.classList.add("active");
        openSubmenu.classList.add("active");
        header.classList.add("white");
        dev.classList.add("white");
        account.classList.add("white");
        hovered.forEach((item) => {
          item.classList.add("white");
        });
      });
    });

    hovered.forEach((item) => {
      item.addEventListener("mouseleave", () => {
        if (!openSubmenu.matches(":hover")) {
          item.classList.remove("active");
          openSubmenu.classList.remove("active");
          // header.classList.remove("white");
          // dev.classList.remove("white");
          account.classList.remove("white");
          // hovered.forEach((item) => {
          //   item.classList.remove("white");
          // });
        }
      });
    });
    openSubmenu.addEventListener("mouseleave", () => {
      if (!openSubmenu.matches(":hover")) {
        openSubmenu.classList.remove("active");
        header.classList.remove("white");
        dev.classList.remove("white");
        account.classList.remove("white");
        hovered.forEach((item) => {
          item.classList.remove("white");
        });
      }
    });

    header.addEventListener("mouseenter", () => {
      dev.classList.add("white");
      header.classList.add("white");
      hovered.forEach((item) => {
        item.classList.add("white");
      });
    });
    header.addEventListener("mouseleave", () => {
      if (!openSubmenu.matches(".active")) {
        header.classList.remove("white");
        dev.classList.remove("white");
        hovered.forEach((item) => {
          item.classList.remove("white");
        });
      }
      if (!openSubmenu.matches(".active")) {
        header.classList.remove("white");
      }
    });
  },
};

export default headerAction;
