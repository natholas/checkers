import { Injectable } from '@angular/core'
import { Board } from './board'

@Injectable()
export class RendererService {
  render(ctx, board: Board) {

    if (!ctx) return

    let width = ctx.canvas.width
    let height = ctx.canvas.height
    let multiplier = width / board.size

    for (let square of board.grid) {
      ctx.beginPath()
      let x = square.pos.x * multiplier
      let y = square.pos.y * multiplier

      ctx.rect(x, y, multiplier, multiplier)
      ctx.fillStyle = square.color
      ctx.fill()

      if (square.highlighted) {
        ctx.beginPath()
        ctx.arc(x + multiplier / 2, y + multiplier / 2, 28, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgba(255,255,255,0.1)'
        ctx.fill()
      } else if (square.toBeKilled) {
        ctx.beginPath()
        ctx.arc(x + multiplier / 2, y + multiplier / 2, 36, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgba(255,0,0,0.2)'
        ctx.fill()
      }
    }

    for (let square of board.grid) {
      let x = square.pos.x * multiplier
      let y = square.pos.y * multiplier

      if (square.chessPiece) {
        ctx.beginPath()
        x += multiplier / 2
        y += multiplier / 2
        ctx.arc(x - square.chessPiece.offset.x, y - square.chessPiece.offset.y, 28, 0, 2 * Math.PI)
        ctx.fillStyle = square.chessPiece.player.color
        ctx.fill()

        if (square.hasMoves) {
          ctx.beginPath()
          ctx.arc(x - square.chessPiece.offset.x, y - square.chessPiece.offset.y, 32, 0, 2 * Math.PI)
          ctx.strokeStyle = 'rgba(255,255,255,0.2)'
          ctx.lineWidth = 10
          ctx.stroke()
        }

        if (square.chessPiece.king) {
          ctx.beginPath()
          ctx.arc(x - square.chessPiece.offset.x, y - square.chessPiece.offset.y, 20, 0, 2 * Math.PI)
          ctx.strokeStyle = 'rgba(120,120,120,0.5)'
          ctx.lineWidth = 4
          ctx.stroke()
        }
      }
    }

  }
}
