import { Square } from './square'
import { Move } from './move'
import { Board } from './board'
import { Player } from './player'

export class Bot {

  takeTurn(board: Board, opponent: Player) {
    let fromSquare: Square

    let best: Square[]
    let bestPoints: number

    for (let square of board.grid) {
      for (let move of square.moves) {
        let points = this.getMoveValue(board, opponent, square, move.square)
        if (!best || points > bestPoints) {
          best = [square, move.square]
          bestPoints = points
        }
      }
    }

    return best
  }

  getMoveValue(board: Board, opponent: Player, fromSquare: Square, toSquare: Square) {
    let points = 0

    return points
  }
}
