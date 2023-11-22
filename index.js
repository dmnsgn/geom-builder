import typedArrayConstructor from "typed-array-constructor";

// TODO
// add positions documentation
// change index to offset so it's always up to date?
// allow int instead of bool

class GeomBuilder {
  constructor(opts = {}) {
    this.count = 0;

    const size = opts.size || 32;
    this.positions = new Float32Array(size * (opts.positions || 3));
    this.positionsIndex = 0;

    if (opts.colors) {
      this.colors = new Float32Array(size * opts.colors);
      this.colorsIndex = 0;
    }
    if (opts.normals) {
      this.normals = new Float32Array(size * opts.normals);
      this.normalsIndex = 0;
    }
    if (opts.uvs) {
      this.uvs = new Float32Array(size * opts.uvs);
      this.uvsIndex = 0;
    }
    if (opts.cells) {
      this.cells = new Uint16Array(size * opts.cells);
      this.indexCount = 0;
    }
  }

  addPosition(position) {
    if (this.positionsIndex + position.length >= this.positions.length) {
      this.positions = this._expandFloatArray(this.positions);
    }
    for (let i = 0; i < position.length; i++) {
      this.positions[this.positionsIndex++] = position[i];
    }
    this.count++;
  }

  addColor(color) {
    if (this.colorsIndex + color.length >= this.colors.length) {
      this.colors = this._expandFloatArray(this.colors);
    }
    for (let i = 0; i < color.length; i++) {
      this.colors[this.colorsIndex++] = color[i];
    }
  }

  addNormal(normal) {
    if (this.normalsIndex + normal.length >= this.normals.length) {
      this.normals = this._expandFloatArray(this.normals);
    }
    for (let i = 0; i < normal.length; i++) {
      this.normals[this.normalsIndex++] = normal[i];
    }
  }

  addUV(uv) {
    if (this.uvsIndex + uv.length >= this.uvs.length) {
      this.uvs = this._expandFloatArray(this.uvs);
    }
    for (let i = 0; i < uv.length; i++) {
      this.uvs[this.uvsIndex++] = uv[i];
    }
  }

  addCell(indices) {
    if (this.indexCount + indices.length >= this.cells.length) {
      this.cells = this._expandUintArray(this.cells);
    }
    for (let i = 0; i < indices.length; i++) {
      this.cells[this.indexCount++] = indices[i];
    }
  }

  reset() {
    this.positionsIndex = 0;
    if (this.normals) this.normalsIndex = 0;
    if (this.uvs) this.uvsIndex = 0;
    if (this.colors) this.colorsIndex = 0;
    if (this.cells) this.indexCount = 0;
    this.count = 0;
  }

  _expandFloatArray(a) {
    const biggerArray = new Float32Array(a.length * 2);
    biggerArray.set(a);
    return biggerArray;
  }

  _expandUintArray(a) {
    const biggerArray = new Uint16Array(a.length * 2);
    biggerArray.set(a);
    return biggerArray;
  }
}

export default function createGeomBuilder(opts) {
  return new GeomBuilder(opts);
}
