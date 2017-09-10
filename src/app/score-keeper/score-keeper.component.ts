import { Component, Input } from '@angular/core';
import { Board } from './../board';
import { Player } from './../player';

@Component({
  selector: 'app-score-keeper',
  templateUrl: './score-keeper.component.html',
  styleUrls: ['./score-keeper.component.css']
})
export class ScoreKeeperComponent {

  @Input() board: Board
  @Input() players: Player[]

  ngOnInit() {
    this.update()
  }

  update() {
    for (let player of this.players) {
      player.score = 0
    }

    for (let square of this.board.grid) {
      if (square.chessPiece) {
        square.chessPiece.player.score += 1
      }
    }

  }

}
