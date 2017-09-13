import { NamesService } from './names.service'

export class Player {
  type: number
  color: string
  score: number = 0
  gamesWon: number = 0
  active: boolean = false
  name: string

  constructor(type: number) {
    this.type = type
    this.name = new NamesService().random()
    this.color = type == 1 ? '#111111' : '#ffffff'
  }
}
