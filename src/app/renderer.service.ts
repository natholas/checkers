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
    }

    for (let square of board.grid) {
      ctx.beginPath()
      let x = square.pos.x * multiplier
      let y = square.pos.y * multiplier

      if (square.chessPiece) {
        ctx.beginPath()
        x += multiplier / 2
        y += multiplier / 2
        ctx.arc(x - square.chessPiece.offset.x, y - square.chessPiece.offset.y, 28, 0, 2 * Math.PI)
        ctx.fillStyle = square.chessPiece.color
        ctx.fill()

        if (square.chessPiece.selected) {
          ctx.strokeStyle = '#666'
          ctx.stroke()
        }

        if (square.chessPiece.king) {
          ctx.beginPath()
          ctx.arc(x - square.chessPiece.offset.x, y - square.chessPiece.offset.y, 24, 0, 2 * Math.PI)
          ctx.strokeStyle = 'red'
          ctx.stroke()
        }
      }
    }

  }
}
