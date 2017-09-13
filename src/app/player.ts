export class Player {
  type: number
  color: string
  score: number = 0
  gamesWon: number = 0
  active: boolean = false
  name: string

  constructor(type: number) {
    this.type = type
    this.name = 'player ' + type
    this.color = type == 1 ? '#111111' : '#ffffff'
  }
}
