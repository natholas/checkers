import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { MainComponent } from './main/main.component'
import { CanvasComponent } from './canvas/canvas.component'

import { BoardService} from './board.service'
import { RendererService} from './renderer.service'
import { Vector} from './vector';
import { ScoreKeeperComponent } from './score-keeper/score-keeper.component'

@NgModule({
  declarations: [
    MainComponent,
    MainComponent,
    CanvasComponent,
    ScoreKeeperComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [BoardService, RendererService],
  bootstrap: [MainComponent]
})
export class AppModule { }
