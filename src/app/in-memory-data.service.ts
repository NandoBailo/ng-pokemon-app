import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'; //L'interface qui demandera d'implémenter la méthode permettant de simuler la BD depuis le serveur
import { POKEMONS } from './pokemon/mock-pokemon-list';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

   createDb() {
    const pokemons = POKEMONS;
    return { pokemons }; //{} indique que c'est dans un objet
  }
}
