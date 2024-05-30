import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonFormComponent } from "../pokemon-form/pokemon-form.component";

@Component({
    selector: 'app-edit-pokemon',
    standalone: true,
    templateUrl: './edit-pokemon.component.html',
    styles: ``,
    imports: [CommonModule, PokemonFormComponent]
})
export class EditPokemonComponent implements OnInit{
//Recupérer le pokemen courrant
currentPokemon : Pokemon | undefined;

constructor (
              private route: ActivatedRoute, 
              private pokemonService: PokemonService
){}


  ngOnInit(): void {
   //Recuperer le pokemon id qui vient de l'url
   const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
   if(pokemonId){
    this.pokemonService.getPokemonById(+pokemonId)
    .subscribe(currentPokemon => this.currentPokemon = currentPokemon);
   }

  }

}
