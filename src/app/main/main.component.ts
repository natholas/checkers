import { Component, ViewChild } from '@angular/core'
import { Board } from './../board'
import { BoardService } from './../board.service'
import { Player } from './../player'
import { ChessPiece } from './../chess-piece'
import { Vector } from './../vector'
import { Square } from './../square'
import { Move } from './../move'

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
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
  showCanvas: boolean = false

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.players = [new Player(0), new Player(1)]
  }

  startGame() {
    this.resetPlayerScore()
    this.board = new Board(this.boardService.generate())
    this.boardService.setupGame(this.board, this.players)
    this.switchActivePlayer()
    this.showCanvas = true
  }

  resetPlayerScore() {
    for (let player of this.players) {
      player.score = 0
    }
  }

  boardMouseDown(pos: Vector) {
    let square = this.board.getSquare(pos)
    if (square.chessPiece && square.chessPiece.player === this.activePlayer) {
      this.selectSquare(this.board.getSquare(pos))
      this.update()
    }
  }

  boardMouseUp(pos: Vector) {
    let moveToSquare = this.board.getSquare(pos)
    if (this.selectedSquare && this.selectedSquare !== moveToSquare) {
      this.moveChessPiece(this.selectedSquare, moveToSquare)
    }
    this.unSelectSquare()
    this.update()
  }

  boardMouseMove(pos: Vector) {
    if (!this.selectedSquare) return
    let squareSize = this.canvas.canvas.width / this.board.size
    let offsetPos = new Vector(
      this.selectedSquare.pos.x * squareSize + squareSize / 2,
      this.selectedSquare.pos.y * squareSize + squareSize / 2
    )

    offsetPos.x -= pos.x
    offsetPos.y -= pos.y

    this.selectedSquare.chessPiece.offset = offsetPos
    this.canvas.render()
  }

  selectSquare(square: Square) {
    this.unSelectSquare()
    this.selectedSquare = square
    square.selected = true
    for (let move of this.selectedSquare.moves) {
      move.square.highlighted = true
    }
  }

  unSelectSquare() {
    if (this.selectedSquare) {
      for (let move of this.selectedSquare.moves) {
        move.square.highlighted = false
      }
      this.selectedSquare.selected = false
    }
    this.selectedSquare = null
  }

  update() {
    this.canvas.render()
    this.scoreKeeper.update()
  }

  removeToBeKilled() {
    for (let square of this.board.grid) {
      square.toBeKilled = false
    }
  }

  moveChessPiece(oldSquare: Square, newSquare: Square) {
    if (!this.squareInMoves(newSquare, oldSquare.moves)) return
    this.board.moveChessPiece(oldSquare, newSquare)
    this.selectSquare(newSquare)
    let lethal = !!this.board.chessPiecesInPath(oldSquare, newSquare).length
    this.kingify(newSquare)
    if (lethal) {
      this.removeJumpedPieces(oldSquare, newSquare)
      this.calcMoves()
      if (newSquare.hasLethalMove) {
        this.removeMoves([newSquare])
      } else {
        this.switchActivePlayer()
      }
    } else {
      this.switchActivePlayer()
    }
  }

  squareInMoves(square: Square, moves: Move[]) {
    for (let move of moves) {
      if (move.square === square) return true
    }
    return false
  }

  switchActivePlayer() {
    if (this.activePlayer) {
      this.activePlayer.active = false
    }
    if (this.activePlayer === this.players[0]) {
      this.activePlayer = this.players[1]
    } else {
      this.activePlayer = this.players[0]
    }
    this.activePlayer.active = true
    this.calcMoves()
  }

  calcMoves() {
    this.removeMoves()
    this.removeToBeKilled()
    for (let square of this.board.grid) {
      if (square.chessPiece && square.chessPiece.player === this.activePlayer) {
        square.moves = this.board.getMoves(square, this.activePlayer)
      }
    }

    for (let square of this.board.grid) {
      for (let move of square.moves) {
        if (move.lethal) {
          this.removeNonLethalMoves()
          return
        }
      }
    }
  }

  removeNonLethalMoves() {
    for (let square of this.board.grid) {
      for (let i = 0; i < square.moves.length; i ++) {
        if (!square.moves[i].lethal) {
          square.moves.splice(i, 1)
          i --
        }
      }
    }
  }

  removeMoves(exceptions: Square[] = []) {
    for (let square of this.board.grid) {
      if (exceptions.indexOf(square) < 0) {
        square.moves = []
      }
    }
  }

  removeJumpedPieces(oldSquare: Square, newSquare: Square) {
    let squares: Square[] = this.board.squaresInPath(oldSquare, newSquare)
    for (let square of squares) {
      square.chessPiece = null
    }
  }

  kingify(newSquare: Square) {
    if (this.board.isKingableSquare(newSquare)) {
      newSquare.chessPiece.king = true
    }
  }

  gameOver(winner: Player) {
    this.activePlayer.active = false
    this.activePlayer = null
    this.removeMoves()
    this.showCanvas = false
    winner.gamesWon += 1
  }
}
