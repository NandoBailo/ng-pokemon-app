import { Component,  Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';


@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  host: {ngSkipHydration: 'true'},
  imports: [CommonModule, PokemonTypeColorPipe, FormsModule, LoaderComponent],
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['pokemon-form.component.css'], 

})

export class PokemonFormComponent implements OnInit {

  //Pour la recherche du pokémon x  
  @Input() pokemon : Pokemon;
  types : string[];
  isAddForm : boolean;
 
  
  constructor(
          private pokemonService: PokemonService, 
          private router: Router
        ){}

  ngOnInit(): void {
    this.types = this.pokemonService.getPokemonTypeList();
    //Récuperer l'url courante de la page d'ajout d'un pokemon
    this.isAddForm = this.router.url.includes('add');
  }


  //vérifie si un pokemon x à un type
  hasType(type: string) : boolean {
    return this.pokemon.types.includes(type);
  }

  isTypesValid(type: string) : boolean{
    //1er cas : Si un seul type coché, bloquer la case qui correspond au type qui est coché pour ne pas avoir 0 type 
   if(this.pokemon.types.length == 1 && this.hasType(type)){
      //Dans ce cas, désactiver la case à cocher
      return false;
    }
    //2eme cas: Si 3 types cochés et qu'on n'a pas déjà ce type , bloquer les autres sinon il va ajouter un 4eme type
    if(this.pokemon.types.length > 2 && !this.hasType(type)){
      //Dans ce cas, désactiver la case à cocher
      return false;
    }

    return true;
  }

  selectType($event: Event, type: string) {
    const isChecked = ($event.target as HTMLInputElement).checked;
    if(isChecked){
      //Ajouter le type coché au pokémon
      this.pokemon.types.push(type);
    }else{
        //Retirer le type décoché. Pour cela , il faudra recupérer l'index du type à retirer
        const index = this.pokemon.types.indexOf(type);
        this.pokemon.types.splice(index, 1);
    }
  }
  
  onSubmit(){
    console.log('Submit form !');
    //Sans les API, on faisait comme suit: 
    //Quand on clique sur Valider, Rédiriger l'utilisateur vers la page du pokémon qu'il vient d'éditer => la page détail d'un pokémon
    //this.router.navigate(['/pokemon', this.pokemon.id]);
    //Avec les API, on passe par le subscribe pour faire la même chose
    if(this.isAddForm){
      //Le cas d'un ajout
      this.pokemonService.addPokemon(this.pokemon)
      .subscribe((pokemon: Pokemon) =>  this.router.navigate(['pokemon', pokemon.id]));
    }else{
        //Le cas d'une édition 
        this.pokemonService.updatePokemon(this.pokemon)
        .subscribe(() => this.router.navigate(['pokemon', this.pokemon.id]));
    }
    
  }

}
