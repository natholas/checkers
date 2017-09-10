export class Player {
  type: number
  color: string

  constructor(type: number) {
    this.type = type
    this.color = type == 1 ? '#333' : '#bbb'
  }
}
