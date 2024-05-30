import { Component, OnInit } from '@angular/core';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../pokemon';
import { BorderCardDirective } from '../border-card.directive';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { SearchPokemonComponent } from '../search-pokemon/search-pokemon.component';

@Component({
  selector: 'app-list-pokemon',
  standalone: true,
  imports: [PokemonTypeColorPipe, CommonModule, BorderCardDirective, SearchPokemonComponent],
  templateUrl: './list-pokemon.component.html',
  
})
export class ListPokemonComponent implements OnInit{

  pokemonList : Pokemon [] ;

  constructor(
        private router: Router, 
        private pokemonService: PokemonService
      ){}

  ngOnInit(): void {
      this.pokemonService.getPokemonList()
      .subscribe(pokemonList => this.pokemonList = pokemonList) as unknown as JSON;
  }

  //Lien vers le détail du pokémon 
  goToPokemon(pokemon: Pokemon){
    this.router.navigate(['/pokemon', pokemon.id]);
  }

  //Lien vers l'ajout d'un pokémon 
  goToAddPokemon(){
    this.router.navigate(['add/pokemon']);
  }

}
