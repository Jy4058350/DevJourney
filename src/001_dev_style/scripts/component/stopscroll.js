// scrollController⭐️
// const elementsToScroll = document.querySelectorAll("[data-scroll]");
const elementsToScroll = document.querySelectorAll(".scroll");
console.log(elementsToScroll);
elementsToScroll.forEach((element) => {
  ScrollTrigger.create({
    trigger: element,
    start: "top top",
    end: "bottom top",
    scroller: "#page-container",
    onUpdate: (self) => {
      console.log()
      console.log(self.progress);
    },
  });
});