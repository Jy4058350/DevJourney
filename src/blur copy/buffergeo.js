import { PlaneGeometry, BufferGeometry, BufferAttribute } from "three";

function Setgeo(wSeg, hSeg) {
  this.wSeg = wSeg;
  this.hSeg = hSeg;
  this.geometry = new BufferGeometry();
  this.plane = new PlaneGeometry(50, 25, this.wSeg, this.hSeg);
}

Setgeo.prototype.createBufferGeo = function () {
  const planeIndex = this.plane.getIndex().array;
  const index = new BufferAttribute(planeIndex, 1);
  this.geometry.setAttribute("position", this.plane.getAttribute("position"));
  this.geometry.setAttribute("uv", this.plane.getAttribute("uv"));
  this.geometry.setIndex(index);
  return this.geometry;
};

export { Setgeo };
