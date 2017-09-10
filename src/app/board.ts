import { Square } from './square'
import { BoardService } from './board.service'
import { Vector } from './vector'
import { Player } from './player'

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

  getMoves(square: Square, activePlayer: Player) {
    let moves = []
    let player = square.chessPiece.player

    let left = square.pos.x !== 0
    let top = square.pos.y !== 0
    let right = square.pos.x !== this.size - 1
    let bottom = square.pos.y !== this.size - 1

    if (right && top) moves.push(new Vector(1,-1))
    if (right && bottom) moves.push(new Vector(1,1))
    if (left && bottom) moves.push(new Vector(-1,1))
    if (left && top) moves.push(new Vector(-1,-1))
    
    for (let i = 0; i < moves.length; i ++) {
      let targetSquare = this.getSquare(square.pos.add(moves[i]))
      
      if (!targetSquare) {
        moves.splice(i, 1)
        i--
        continue
      }
      if (targetSquare.chessPiece && targetSquare.chessPiece.player !== activePlayer) {
        let jumpTargetSquare = this.getSquare(targetSquare.pos.add(moves[i]))
        if (jumpTargetSquare && !jumpTargetSquare.chessPiece) {
          moves.splice(i, 1)
          moves.splice(i, 0, jumpTargetSquare)
        } else {
          moves.splice(i, 1)
          i --
        }
      } else if (targetSquare.chessPiece && targetSquare.chessPiece.player === activePlayer) {
        moves.splice(i, 1)
        i--
      } else if (!square.chessPiece.king && (targetSquare.pos.y > square.pos.y && player.type == 0 || targetSquare.pos.y < square.pos.y && player.type == 1)) {
        moves.splice(i, 1)
        i--
      } else {
        moves[i] = targetSquare
      }
    }

    return moves
  }

  isJump(p1: Vector, p2: Vector) {
    return Math.abs(p1.x - p2.x) > 1
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

  isKingableSquare(square: Square) {
    if (!square.chessPiece) return false
    let playerType = square.chessPiece.player.type
    if (playerType === 0 && square.pos.y === 0) return true
    if (playerType === 1 && square.pos.y === this.size - 1) return true
  }

}
