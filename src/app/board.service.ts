import { Injectable } from '@angular/core'
import { Square } from './square'
import { Vector } from './vector'
import { Board } from './board'
import { ChessPiece } from './chess-piece'
import { Player } from './player'

@Injectable()
export class BoardService {

  generate(size: number = 10) {
    let squares: Square[] = []

    let traversable = false
    let colorCounter = 0
    let counter = 0

    for (let i = 0; i < size; i++) {
      for (let ii = 0; ii < size; ii++) {

        if (colorCounter >= size) {
          colorCounter = 0
        } else {
          traversable = !traversable
        }

        colorCounter ++
        let color = traversable ? 'black' : 'white'
        squares.push(new Square(counter, new Vector(ii, i), color, traversable))
        counter ++
      }
    }

    return squares
  }

  setupGame(board: Board, players: Player[]) {

    for (let square of board.grid) {
      
      if (square.traversable && square.pos.y < 4) {
        square.chessPiece = new ChessPiece(players[1])
      } else if (square.traversable && square.pos.y > board.size - 5) {
        square.chessPiece = new ChessPiece(players[0])
      }
    }

    return board
  }

}
