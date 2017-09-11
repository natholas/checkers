export class Vector {

  x: number
  y: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  add(vec: Vector) {
    return new Vector(
      this.x + vec.x,
      this.y + vec.y
    )
  }

  times(val: number) {
    return new Vector(
      this.x * val,
      this.y * val
    )
  }

}
