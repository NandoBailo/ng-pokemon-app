import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonModule } from './pokemon/pokemon.module';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientJsonpModule,
    RouterOutlet,
    PokemonModule
  ],
  templateUrl: 'app.component.html',
})

export class AppComponent {}
