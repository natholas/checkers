import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Player } from './../player'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() players: Player[]
  @Output() startGame: EventEmitter<any> = new EventEmitter();
}
