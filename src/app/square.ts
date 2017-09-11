import { Vector } from './vector'
import { ChessPiece } from './chess-piece'
import { Move } from './move'

export class Square {

  index: number
  pos: Vector
  origColor: string
  chessPiece: ChessPiece
  traversable: boolean
  isSelected: boolean = false
  moves: Move[] = []
  highlighted: boolean

  constructor(index: number, pos: Vector, color: string, traversable: boolean) {
    this.index = index
    this.pos = pos

    this.origColor = color
    this.traversable = traversable
  }

  get color() {
    if (this.highlighted) return 'aquamarine'
    return this.origColor
  }

  set selected(val: boolean) {
    this.isSelected = val
    if (this.chessPiece) {
      this.chessPiece.selected = val
      this.chessPiece.offset.x = 0
      this.chessPiece.offset.y = 0
    }
  }

  get chessPieceColor() {
    if (this.moves.length > 0) return this.chessPiece.player.colorAvailable
    return this.chessPiece.player.color
  }

}
