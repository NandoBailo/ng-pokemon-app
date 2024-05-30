import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { CommonModule } from '@angular/common';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { PokemonService } from '../pokemon.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-detail-pokemon',
  standalone: true,
  imports: [CommonModule, PokemonTypeColorPipe, LoaderComponent],
  templateUrl: './detail-pokemon.component.html',
  styles: ``
})

export class DetailPokemonComponent implements OnInit{

  currentPokemon : Pokemon | undefined;

  constructor(
            private route: ActivatedRoute, 
            private router: Router,
            private pokemonService: PokemonService
  ){}

  ngOnInit(): void {
    //Recupérer l'id du pokemen dans l' URL
    const pokemonId: string | null=this.route.snapshot.paramMap.get('id'); 

    if(pokemonId){
      this.pokemonService.getPokemonById(+pokemonId)
      .subscribe(currentPokemon => this.currentPokemon = currentPokemon);
    }   

  }

  goToPokemonList(): void {
    this.router.navigate(['/pokemons']);
  }

  goToPokemonEdit(pokemen: Pokemon){
    this.router.navigate(['/edit/pokemon', pokemen.id]);
  }

  goToPokemonListAfterDelete(pokemon: Pokemon){
      this.pokemonService.deletePokemonById(pokemon.id)
      .subscribe(() => this.goToPokemonList());
  }
     

}
