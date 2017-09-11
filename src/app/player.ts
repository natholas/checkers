export class Player {
  type: number
  color: string
  score: number = 0
  active: boolean = false

  constructor(type: number) {
    this.type = type
    this.color = type == 1 ? '#555' : '#ccc'
  }
}
