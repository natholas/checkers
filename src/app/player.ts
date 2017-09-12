export class Player {
  type: number
  color: string
  colorAvailable: string
  score: number = 0
  gamesWon: number = 0
  active: boolean = false

  constructor(type: number) {
    this.type = type
    this.color = type == 1 ? '#555' : '#ccc'
    this.colorAvailable = type == 1 ? 'darkred' : 'pink'
  }
}
