import { Component, Input, EventEmitter, Output } from '@angular/core'
import { RendererService } from './../renderer.service'
import { Vector } from './../vector'

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent {

  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  @Input() board
  @Output() boardMouseDown: EventEmitter<any> = new EventEmitter();
  @Output() boardMouseUp: EventEmitter<any> = new EventEmitter();
  @Output() boardMouseMove: EventEmitter<any> = new EventEmitter();

  constructor(private rendererService: RendererService) { }

  mousePos(e) {
    let multiplier = this.canvas.width / this.canvas.clientWidth
    
    return new Vector(
      (e.clientX - this.canvas.offsetLeft) * multiplier,
      (e.clientY - this.canvas.offsetTop) * multiplier
    )
  }

  mousePosInSquares(pos: Vector) {
    let convertion = this.ctx.canvas.width / this.board.size
    return new Vector(
      Math.floor(pos.x / convertion),
      Math.floor(pos.y / convertion)
    )
  }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement> document.getElementById('canvas')
    
    this.ctx = this.canvas.getContext('2d')
    this.rendererService.render(this.ctx, this.board)
    var t = this
    this.canvas.addEventListener('mousedown', function (e) {
      t.boardMouseDown.emit(t.mousePosInSquares(t.mousePos(e)))
    })
    this.canvas.addEventListener('mouseup', function (e) {
      t.boardMouseUp.emit(t.mousePosInSquares(t.mousePos(e)))
    })

    this.canvas.addEventListener('mousemove', function (e) {
      t.boardMouseMove.emit(t.mousePos(e))
    })
  }

  render() {
    this.rendererService.render(this.ctx, this.board)
  }

}
