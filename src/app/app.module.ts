import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { MainComponent } from './main/main.component'
import { CanvasComponent } from './canvas/canvas.component'

import { BoardService} from './board.service'
import { RendererService} from './renderer.service'
import { Vector} from './vector';
import { ScoreKeeperComponent } from './score-keeper/score-keeper.component';
import { MenuComponent } from './menu/menu.component'

@NgModule({
  declarations: [
    MainComponent,
    MainComponent,
    CanvasComponent,
    ScoreKeeperComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [BoardService, RendererService],
  bootstrap: [MainComponent]
})
export class AppModule { }
