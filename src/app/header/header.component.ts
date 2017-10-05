import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent {

	constructor(private recipeService: RecipeService,
		private dataStorageService: DataStorageService) {}
	
	onSaveData() {
		this.dataStorageService.storeRecipes()
		.subscribe(
			(response: Response) => {
				console.log(response.text());
				console.log(response);
				
				console.log(response.json());
			},
			(error: Response) => {
				// console.log(error);
			});
	}
	onFetchData() {
		this.dataStorageService.getRecipes();
	}
}