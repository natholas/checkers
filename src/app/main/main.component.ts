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
  @ViewChild('scoreKeeper')
  scoreKeeper
  board: Board
  players: Player[] = []
  selectedSquare: Square = null
  activePlayer: Player

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.players = [new Player(0), new Player(1)]
    this.board = new Board(this.boardService.generate())
    this.boardService.setupGame(this.board, this.players)
    this.switchActivePlayer()
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
    this.update()
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
    this.update()
  }

  selectSquare(square: Square) {
    this.unSelectSquare()
    this.selectedSquare = square
    square.selected = true
    for (let square of this.selectedSquare.moves) {
      square.highlighted = true
    }
    this.update()
  }

  unSelectSquare() {
    if (this.selectedSquare) {
      for (let square of this.selectedSquare.moves) {
        square.highlighted = false
      }
      this.selectedSquare.selected = false
    }
    this.selectedSquare = null
  }

  update() {
    this.canvas.render()
    this.scoreKeeper.update()
  }

  moveChessPiece(oldSquare: Square, newSquare: Square) {
    if (oldSquare.moves.indexOf(newSquare) < 0) return
    newSquare.chessPiece = oldSquare.chessPiece
    oldSquare.chessPiece = null
    let didJump = this.board.squaresWithChessPiecesInPath(oldSquare, newSquare).length
    this.selectSquare(newSquare)
    if (!didJump) this.switchActivePlayer()
    else this.removeJumpedPieces(oldSquare, newSquare)
    if (this.board.isKingableSquare(newSquare)) {
      newSquare.chessPiece.king = true
    }
    this.update()
  }

  switchActivePlayer() {
    if (this.activePlayer) this.activePlayer.active = false
    if (this.activePlayer === this.players[0]) {
      this.activePlayer = this.players[1]
    } else {
      this.activePlayer = this.players[0]
    }
    this.activePlayer.active = true
    this.calcMoves()
  }

  calcMoves() {
    for (let square of this.board.grid) {
      if (square.chessPiece && square.chessPiece.player === this.activePlayer) {
        square.moves = this.board.getMoves(square, this.activePlayer)
      }
    }
  }

  removeJumpedPieces(oldSquare: Square, newSquare: Square) {
    let squares: Square[] = this.board.squaresInPath(oldSquare, newSquare)
    for (let square of squares) {
      square.chessPiece = null
    }
  }
}
