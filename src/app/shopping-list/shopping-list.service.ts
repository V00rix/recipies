import { Subject } from 'rxjs/Subject';
import { Ingredient } from '../shared/ingredient.model'

export class ShoppingListService {
	ingredientsChanged = new Subject<Ingredient[]>();
	startedEditing = new Subject<number>();
	private ingredients: Ingredient[] = [
	new Ingredient('Apples', 5),
	new Ingredient('Tomatoes', 10),
	];
	
	getIngredients() {
		return this.ingredients.slice(); 
	}

	getIngredient(id: number) {
		return this.ingredients[id]; 
	}

	removeIngredient(id: number) {
		this.ingredients.splice(id, 1);
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	addIngredient(ingredient: Ingredient) {
		this.ingredients.push(ingredient);
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	addIngredients(ingredients: Ingredient[]) {
		this.ingredients.push(...ingredients);
		this.ingredientsChanged.next(this.ingredients.slice());
	}
}