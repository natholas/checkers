import { Player } from './player'
import { Vector } from './vector'

export class ChessPiece {
  player: Player
  selected: boolean = false
  offset: Vector = new Vector()
  king: boolean = false

  constructor(player: Player) {
    this.player = player
  }
}
