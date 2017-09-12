import { Vector } from './vector'
import { ChessPiece } from './chess-piece'
import { Move } from './move'

export class Square {

  index: number
  pos: Vector
  color: string
  chessPiece: ChessPiece
  traversable: boolean
  isSelected: boolean = false
  toBeKilled: boolean = false
  highlighted: boolean = false
  moves: Move[] = []

  constructor(index: number, pos: Vector, color: string, traversable: boolean) {
    this.index = index
    this.pos = pos
    this.color = color
    this.traversable = traversable
  }

  set selected(val: boolean) {
    this.isSelected = val
    if (this.chessPiece) {
      this.chessPiece.selected = val
      this.chessPiece.offset.x = 0
      this.chessPiece.offset.y = 0
    }
  }

  get hasLethalMove() {
    for (let move of this.moves) {
      if (move.lethal) return true
    }
    return false
  }

  get hasMoves() {
    return this.moves.length > 0
  }

}
