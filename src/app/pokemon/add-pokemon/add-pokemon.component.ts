import { Component, OnInit } from '@angular/core';
import { PokemonFormComponent } from "../pokemon-form/pokemon-form.component";
import { Pokemon } from '../pokemon';

@Component({
    selector: 'app-add-pokemon',
    standalone: true,
    templateUrl: 'add-pokemon.component.html',
    styles: ``,
    imports: [PokemonFormComponent]
})
export class AddPokemonComponent implements OnInit{

pokemon: Pokemon;

ngOnInit(): void {
    this.pokemon = new Pokemon();
}

}
