import { RouterModule, Routes } from '@angular/router';

import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { NgModule } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { authGuard } from '../auth.guard';


 export const pokemonRoutes: Routes = [
  { path: 'edit/pokemon/:id', component: EditPokemonComponent, canActivate: [authGuard]},
  {path: 'add/pokemon', component: AddPokemonComponent, canActivate: [authGuard]},
  { path: 'pokemons', component: ListPokemonComponent, canActivate: [authGuard]},
  { path: 'pokemon/:id', component: DetailPokemonComponent, canActivate: [authGuard]}
  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(pokemonRoutes)
  ],
  providers: [PokemonService]
})

export class PokemonModule {}



