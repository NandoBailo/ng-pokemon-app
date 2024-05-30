import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { pokemonRoutes } from './pokemon/pokemon.module';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [ 
                provideHttpClient(withJsonpSupport()),
                importProvidersFrom(
                                    [HttpClientInMemoryWebApiModule.forRoot
                                      (
                                        InMemoryDataService, 
                                        {dataEncapsulation: false}
                                      )
                                    ]
                                  ), 
                provideClientHydration(),
                provideRouter(pokemonRoutes),
                provideRouter(routes),
              
              ]
};
