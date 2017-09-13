import { Injectable } from '@angular/core';

@Injectable()
export class NamesService {

  names: string[] = [
    'Mae',
    'Donette',
    'Sadie',
    'Katheleen',
    'Lonnie',
    'Lynsey',
    'Adan',
    'Lawrence',
    'Lavelle',
    'Kristopher',
    'Becky',
    'Graham',
    'Daina',
    'Elise',
    'Frederica',
    'Daine',
    'Merissa',
    'Sparkle',
    'Bibi',
    'Wyatt',
    'Ranae',
    'Easter',
    'Sarai',
    'Ivette',
    'Alona',
    'Luisa',
    'Dawna',
    'Nathan',
    'Dino',
    'Soo',
    'Ronald',
    'Elsie',
    'Alysa',
    'Rochel',
    'Zane',
    'Denita',
    'Clemmie',
    'Mattie',
    'Andree',
    'Justa',
    'Silvana',
    'Khalilah',
    'Justin',
    'Esmeralda',
    'Leilani',
    'Charissa',
    'Alla',
    'Lorrine',
    'Hunter',
    'Philomena'
  ]

  random() {
    let index = Math.floor(Math.random() * this.names.length)
    return this.names[index]
  }

}
