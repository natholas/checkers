import { Injectable } from '@angular/core'
import { Square } from './square'
import { Vector } from './vector'
import { Board } from './board'
import { ChessPiece } from './chess-piece'
import { Presets } from './presets'
import { Player } from './player'

@Injectable()
export class BoardService {

  presets = new Presets()

  generate(size: number = 8) {
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
        let color = traversable ? '#423426' : '#fbf2de'
        squares.push(new Square(counter, new Vector(ii, i), color, traversable))
        counter ++
      }
    }

    return squares
  }

  setupGame(board: Board, players: Player[], preset: number = 0) {

    if (preset === 0) {
      for (let square of board.grid) {
        if (square.traversable && square.pos.y < (board.size/2 - 1)) {
          square.chessPiece = new ChessPiece(players[1])
        } else if (square.traversable && square.pos.y >= (board.size/2 + 1)) {
          square.chessPiece = new ChessPiece(players[0])
        }
      }
    } else {
      let pre = this.presets[preset - 1];
      for (let square of board.grid) {
        if (pre[square.index] !== null) {
          square.chessPiece = new ChessPiece(players[pre[square.index]])
        }
      }
    }

    return board
  }

}
