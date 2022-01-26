import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private Http: HttpClient,  private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.Http.put('https://recipes-cfc0d-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.Http
      .get<Recipe[]>(
        'https://recipes-cfc0d-default-rtdb.firebaseio.com/recipes.json',
      )
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe: Recipe) => {
            return {
              ...recipe,
              ingredients : recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap( (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
