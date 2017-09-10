import { Component, Input, EventEmitter, Output } from '@angular/core'
import { RendererService } from './../renderer.service'
import { Vector } from './../vector'

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent {

  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  @Input() board
  @Output() boardMouseDown: EventEmitter<any> = new EventEmitter();
  @Output() boardMouseUp: EventEmitter<any> = new EventEmitter();
  @Output() boardMouseMove: EventEmitter<any> = new EventEmitter();

  constructor(private rendererService: RendererService) { }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement> document.getElementById('canvas')
    
    this.ctx = this.canvas.getContext('2d')
    this.rendererService.render(this.ctx, this.board)
    var t = this
    this.canvas.addEventListener('mousedown', function (e) {
      let convertion = t.ctx.canvas.width / t.board.size

      t.boardMouseDown.emit(new Vector(
        Math.floor(e.clientX / convertion),
        Math.floor(e.clientY / convertion)
      ))
    })
    this.canvas.addEventListener('mouseup', function (e) {
      let convertion = t.ctx.canvas.width / t.board.size

      t.boardMouseUp.emit(new Vector(
        Math.floor(e.clientX / convertion),
        Math.floor(e.clientY / convertion)
      ))
    })

    this.canvas.addEventListener('mousemove', function (e) {
      let convertion = t.ctx.canvas.width / t.board.size

      t.boardMouseMove.emit(
        new Vector(
          e.clientX,
          e.clientY
        )
      )
    })
  }

  render() {
    this.rendererService.render(this.ctx, this.board)
  }

}
