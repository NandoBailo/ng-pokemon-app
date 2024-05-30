import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-pokemon.component.html',
  styles: ``
})
export class SearchPokemonComponent implements OnInit {
  //Flux de données dans le temps représentant les recherches du user {.."a".."ab".."abz".."ab".."abc"..}
  searchTerms = new Subject<string>();
  //Resultat de la recherche correspondant aux flux de données de searchTerms
  pokemons$: Observable<Pokemon[]>;

  constructor(
                private router: Router,
                private pokemonService: PokemonService
              )
  {}

  ngOnInit(): void{
    this.pokemons$ = this.searchTerms.pipe(
      //{..."a"."ab"..."abz".."ab"..."abc"......}
      debounceTime(300),
       //{...."ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      //{........"ab"...."abc"......}
      switchMap((term) => this.pokemonService.searchPokemonList(term))
      //{........pokemonList(ab)....pokemonList(abc)......}

    );
  }

  search(term: string){
      this.searchTerms.next(term);
  }

  goToDetailPokemon(pokemon: Pokemon){
    this.router.navigate(['/pokemon', pokemon.id]);
  }

}
