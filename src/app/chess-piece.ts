import { Player } from './player'
import { Vector } from './vector'

export class ChessPiece {
  player: Player
  selected: boolean = false
  origColor: string
  offset: Vector = new Vector()
  king: boolean = false

  constructor(player: Player) {
    this.player = player
    this.origColor = player.color
  }

  get color() {
    // if (this.selected) return 'red'
    return this.origColor
  }
}
