import { Square } from './square'
import { Move } from './move'
import { Board } from './board'

export class Bot {

  takeTurn(board: Board) {
    let fromSquare: Square

    for (let square of board.grid) {
      if (square.moves.length) {
        fromSquare = square
        break
      }
    }

    if (!fromSquare) {
      return false
    }

    let index = Math.floor(Math.random() * fromSquare.moves.length)
    let toSquare = fromSquare.moves[index].square

    return [fromSquare, toSquare]
  }
}
