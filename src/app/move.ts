import { Vector } from './vector'
import { Square } from './square'

export class Move {

  square: Square
  lethal: boolean

  constructor(square: Square, lethal: boolean = false) {
    this.square = square
    this.lethal = lethal
  }

}
