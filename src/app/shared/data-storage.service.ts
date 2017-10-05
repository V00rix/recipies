import { Injectable } from '@angular/core';

import { Response, Http } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/Rx'

@Injectable()
export class DataStorageService {
	constructor(private http: Http, private recipeService: RecipeService) {}

	storeRecipes() {
		return this.http.put('http://localhost/script/', this.recipeService.getRecipes());
		// return this.http.put('https://angularbackend-33bbe.firebaseio.com/recipes.json', this.recipeService.getRecipes());
	}
	getRecipes() {
		this.http.get('http://localhost/script/')
		// this.http.get('https://angularbackend-33bbe.firebaseio.com/recipes.json')
		.map(
			(response: Response) => {
				console.log(response);
				
				const recipes: Recipe[] = response.json();
				for (let recipe of recipes) {
					if (!recipe['ingredients']) {
						// console.log(recipe);
						recipe['ingredients'] = [];
					}
				}
				return recipes;
			},
			(error: Response) => {
				// console.log(error);
				
			}
			)
		.subscribe(
			(recipes: Recipe[]) => {
				this.recipeService.loadRecipes(recipes);
			});
	}
}