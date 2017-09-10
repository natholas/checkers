import { Component, ViewChild } from '@angular/core'
import { Board } from './../board'
import { BoardService } from './../board.service'
import { Player } from './../player'
import { ChessPiece } from './../chess-piece'
import { Vector } from './../vector'
import { Square } from './../square'

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {
  @ViewChild('canvas')
  canvas
  board: Board
  players: Player[] = []
  selectedSquare: Square = null
  activePlayer: Player


  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.players = [new Player(0), new Player(1)]
    this.board = new Board(this.boardService.generate(10))
    this.boardService.setupGame(this.board, this.players)
    this.activePlayer = this.players[0]
  }

  boardMouseDown(pos: Vector) {
    let square = this.board.getSquare(pos)
    if (square.chessPiece && square.chessPiece.player === this.activePlayer) {
      this.selectSquare(this.board.getSquare(pos))
    }
  }

  boardMouseUp(pos: Vector) {
    let newSquare = this.board.getSquare(pos)
    if (this.selectedSquare && newSquare !== this.selectedSquare) {
      this.moveChessPiece(this.selectedSquare, newSquare)
    }
    this.unSelectSquare()
    this.render()
  }

  boardMouseMove(rawPos: Vector) {
    if (!this.selectedSquare) return
    let squareSize = this.canvas.canvas.width / this.board.size
    let offsetPos = new Vector(
      this.selectedSquare.pos.x * squareSize + squareSize / 2,
      this.selectedSquare.pos.y * squareSize + squareSize / 2
    )

    offsetPos.x -= rawPos.x
    offsetPos.y -= rawPos.y
    
    this.selectedSquare.chessPiece.offset = offsetPos
    this.render()
  }

  selectSquare(square: Square) {
    this.unSelectSquare()
    this.selectedSquare = square
    square.selected = true
    this.render()
  }

  unSelectSquare() {
    if (this.selectedSquare) {
      this.selectedSquare.selected = false
    }
    this.selectedSquare = null
  }

  render() {
    this.canvas.render()
  }

  checkIfMoveIsLegal(oldSquare: Square, newSquare: Square) {
    if (!newSquare.traversable) return
    let moves = this.board.getMoves(oldSquare, this.activePlayer)
    if (moves.indexOf(newSquare) < 0) return
    return true
  }

  moveChessPiece(oldSquare: Square, newSquare: Square) {
    if (!this.checkIfMoveIsLegal(oldSquare, newSquare)) return
    newSquare.chessPiece = oldSquare.chessPiece
    oldSquare.chessPiece = null
    let didJump = this.board.isJump(oldSquare.pos, newSquare.pos)
    this.selectSquare(newSquare)
    if (!didJump) this.switchActivePlayer()
    else this.removeJumpedPieces(oldSquare, newSquare)
    this.render()
  }

  switchActivePlayer() {
    if (this.activePlayer === this.players[0]) {
      this.activePlayer = this.players[1]
    } else {
      this.activePlayer = this.players[0]
    }
  }

  removeJumpedPieces(oldSquare: Square, newSquare: Square) {
    let squares: Square[] = this.board.squaresInPath(oldSquare, newSquare)
    for (let square of squares) {
      square.chessPiece = null
    }
  }
}
