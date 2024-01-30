class SlideIndexManager {
  constructor() {
    this.currentIndex = 0;
  }

  updateIndex(increment) {
    this.currentIndex += increment;
  }

  setIndex(index) {
    this.currentIndex = index;
  }

  getIndex() {
    return this.currentIndex;
  }
}

export default new SlideIndexManager();
