import { Square } from './square'
import { BoardService } from './board.service'
import { Vector } from './vector'
import { Player } from './player'
import { Move } from './move'

export class Board {

  grid: Square[]
  size: number

  constructor(grid: Square[]) {
    this.size = Math.sqrt(grid.length)
    this.grid = grid
  }

  getSquare(pos: Vector) {
    let index = pos.x + pos.y * this.size
    return this.grid[index]
  }

  onBoard(pos: Vector) {
    if (pos.x < 0) return false
    if (pos.y < 0) return false
    if (pos.x >= this.size) return false
    if (pos.y >= this.size) return false
    return true
  }

  getMovesInDir(square: Square, player: Player, dir: Vector) {
    let moves: Move[] = []
    let allowed = true
    let origDir = new Vector(dir.x, dir.y)
    let index = 1
    let lethal = false

    while (allowed && index < 100) {
      dir = origDir.times(index)
      index ++

      // If the direction is off the board then this move is not possible
      if (!this.onBoard(square.pos.add(dir))) {
        allowed = false
        continue
      }

      // getting the square in the direction
      let dirSquare = this.getSquare(square.pos.add(dir))

      // Checking if square is occupied
      if (dirSquare.chessPiece) {

        // If we are already jumping over an enemy then we cant jump
        // over another one
        if (lethal) {
          allowed = false
          continue
        }

        // If the chessPiece is the players then this move is not possible
        if (dirSquare.chessPiece.player == player) {
          allowed = false
          continue
        }

        // If the next square is off the board then this move is not possible
        if (!this.onBoard(dirSquare.pos.add(origDir))) {
          allowed = false
          continue
        }

        // Finding the square after the one we are currently checking
        let nextSquare = this.getSquare(dirSquare.pos.add(origDir))

        // If the next square after this one is occupied then this move
        // is not possible
        if (nextSquare.chessPiece) {
          allowed = false
          continue
        }

        // This square is a possible move
        // Marking the jumped over square as toBeKilled
        dirSquare.toBeKilled = true
        lethal = true
        moves.push(new Move(nextSquare, lethal))

      } else {

        // If the chessPiece is not king then it is not allowed to move backwards
        // Checking movement direction based on player type
        if (!square.chessPiece.king) {
          if (player.type == 0 && dirSquare.pos.y > square.pos.y) {
            allowed = false
            continue
          } else if (player.type == 1 && dirSquare.pos.y < square.pos.y) {
            allowed = false
            continue
          }
        }

        // This square is a possible move
        moves.push(new Move(dirSquare, lethal))
      }

      // If the chessPiece is not a king then we don't allow it more than this one move
      if (!square.chessPiece.king) {
        allowed = false
      }
    }

    return moves
  }

  moveChessPiece(oldSquare: Square, newSquare: Square) {
    newSquare.chessPiece = oldSquare.chessPiece
    oldSquare.chessPiece = null
  }

  getMoves(square: Square, activePlayer: Player) {
    let player = square.chessPiece.player
    let chessPiece = square.chessPiece
    let moves: Move[] = []

    let dirs = [
      new Vector(1,-1), new Vector(1,1), new Vector(-1,1), new Vector(-1,-1)
    ]

    for (let dir of dirs) {
      moves = moves.concat(this.getMovesInDir(square, activePlayer, dir))
    }

    return moves
  }

  squaresInPath(square1: Square, square2: Square) {
    let squares: Square[] = []
    let p1 = square1.pos, p2 = square2.pos
    let dirr

    if (p1.x > p2.x && p1.y > p2.y) dirr = new Vector(1,1)
    if (p1.x > p2.x && p1.y < p2.y) dirr = new Vector(1,-1)
    if (p1.x < p2.x && p1.y < p2.y) dirr = new Vector(-1,-1)
    if (p1.x < p2.x && p1.y > p2.y) dirr = new Vector(-1,1)

    let targetPos = p2
    while (targetPos.x !== p1.x && targetPos.y !== p1.y) {
      targetPos = targetPos.add(dirr)
      squares.push(this.getSquare(targetPos))
    }
    squares.splice(squares.length-1, 1)
    return squares
  }

  chessPiecesInPath(square1: Square, square2: Square) {
    let squares = this.squaresInPath(square1, square2)
    let output = []
    for (let square of squares) {
      if (square.chessPiece) {
        output.push(square)
      }
    }
    return output
  }

  isKingableSquare(square: Square) {
    if (!square.chessPiece) return false
    let playerType = square.chessPiece.player.type
    if (playerType === 0 && square.pos.y === 0) return true
    if (playerType === 1 && square.pos.y === this.size - 1) return true
  }

}
