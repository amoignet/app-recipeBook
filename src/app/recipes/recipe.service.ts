import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model' ;

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Ratatouille',
  //     'Une ratatouille comme chez Disney',
  //     'https://www.liveeatlearn.com/wp-content/uploads/2017/01/ratatouille-vegetable-tian-vert-500x500.jpg',
  //     [
  //       new Ingredient('Tomato', 3),
  //       new Ingredient('Zucchini', 2)
  //     ]
  //     ),
  //   new Recipe(
  //     'Big Fat Burger',
  //     'Yummy yummy !!!!',
  //     'https://static.onecms.io/wp-content/uploads/sites/9/2021/05/19/urdaburger-FT-RECIPE0621.jpg',
  //     [
  //       new Ingredient('Buns', 1),
  //       new Ingredient('Meat', 2),
  //       new Ingredient('Raclette', 1),
  //       new Ingredient('Bacon', 3)
  //     ]
  //     )
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(newRecipe: Recipe): void {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
