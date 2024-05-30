
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,NotFoundError,Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';
import { error } from 'console';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class PokemonService{
 
  constructor(private http: HttpClient){}

   getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((response) => {return this.log(response)}),
      catchError((error) => this.handleError(error, []))
    );

  }

  getPokemonById(pokemonId : number) : Observable<Pokemon | undefined>{
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => {return this.log(response)}),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  updatePokemon(pokemon : Pokemon) : Observable<Pokemon | undefined>{
    const httpOptions = {
      Headers: new HttpHeaders({ 'Content-Type' : 'json' })
    };
      return this.http.put<Pokemon>('api/pokemons', pokemon).pipe(
        tap((response) => {return this.log(response)}),
        catchError((error) => 
                    this.handleError(error, undefined)
                )
      );

  }

  deletePokemonById(pokemonId: number) : Observable<Pokemon | undefined>{
    return this.http.delete<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => {return this.log(response)}),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  addPokemon(pokemon : Pokemon) : Observable<Pokemon>{
    return this.http.post<Pokemon>('api/pokemons', pokemon).pipe(
      tap((response) => {return this.log(response)}),
      catchError((error) => this.handleError(error, null))
    );
  }

  searchPokemonList(term: string) : Observable<Pokemon[]>{
    
    if(term.length <= 1){

      return of([]);

    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => {return this.log(response)}),
      catchError((error) => this.handleError(error, []))
    );
     
  }
  
  //Gestion des erreurs 
  private log(response: any){
      console.table(response);
  }

  private handleError(error: Error, errorValue : any){
        console.error('Error',error);
        return of (errorValue);
  }
  


  getPokemonTypeList() : string[]{
    return [
              'Plante',
              'Feu',
              'Eau',
              'Insecte',
              'Normal',
              'Electrik',
              'Poison',
              'Fée',
              'Vol', 
              'Combat', 
              'Psy'
            ];
  }




}
