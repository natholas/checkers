import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Player } from './../player'
import { Config } from './../config'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() players: Player[]
  @Input() config: Config
  @Output() startGame: EventEmitter<any> = new EventEmitter();

  showMenu: boolean = true
  showSettings: boolean = false

  ngOnInit() {
    this.config.gameSize = 8
    this.config.player0Name = 'player 1'
    this.config.player1Name = 'player 2'
  }

  settings() {
    this.showSettings = true
    this.showMenu = false
  }

  start() {
    this.showSettings = false
    this.showMenu = true
    this.startGame.emit()
  }
}
