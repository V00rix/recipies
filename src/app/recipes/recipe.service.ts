import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
	recipesChanged = new Subject<Recipe[]>();

	private recipes:Recipe[] = [
	new Recipe('Tasty Shnitzel','A super-tasty shnitzel - just awesome!', 
		'https://www.salomon-foodworld.com/files/salomon/images/Produkterlebnisse/Center%20of%20the%20Plate/MEAT-SELECTION-Knusper-Schnitzel-gebraten_Freisteller_Wedges_72dpi.png',
		[new Ingredient('Meat', 1),	new Ingredient('French Fries', 20)]),
	new Recipe('Big Fat Burger','What else you need to say?', 
		'https://www.fatburgercanada.com/wp-content/uploads/2015/07/king-burger-541x633.png',
		[new Ingredient('Buns', 2),	new Ingredient('Meat', 1)])
	];

	constructor(private shoppingListService: ShoppingListService) {}

	getRecipes() {
		return this.recipes.slice();
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients);
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipesChanged.next(this.recipes.slice());
	}

	updateRecipe(id: number, recipe: Recipe) {
		this.recipes[id] = recipe;
		this.recipesChanged.next(this.recipes.slice());
	}

	deleteRecipe(id: number) {
		this.recipes.splice(id, 1);
		this.recipesChanged.next(this.recipes.slice());
	}

	loadRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipesChanged.next(this.recipes.slice());
	}
}