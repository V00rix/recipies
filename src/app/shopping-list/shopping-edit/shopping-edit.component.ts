import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from  '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {	
	@ViewChild('f') shoppingListForm: NgForm;
	subscription: Subscription;
	editMode = false;
	editedItemId: number;
	editedItem: Ingredient;

	constructor(private shoppingListService: ShoppingListService) { }

	ngOnInit() {
		this.subscription = this.shoppingListService.startedEditing.subscribe(
			(id: number) => {
				this.editedItemId = id;
				this.editMode = true;
				this.editedItem = this.shoppingListService.getIngredient(id);
				this.shoppingListForm.setValue({
					nameControl: this.editedItem.name,
					amountControl: this.editedItem.amount
				})
			});
	}

	onAddItem(f: FormControl) {
		if (this.editMode){
			this.shoppingListService.getIngredient(this.editedItemId).name = f.value.nameControl;
			this.shoppingListService.getIngredient(this.editedItemId).amount = f.value.amountControl;
		}
		else
			this.shoppingListService.addIngredient(new Ingredient(
				f.value.nameControl, f.value.amountControl));
		this.onClear();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onDelete() {
		this.shoppingListService.removeIngredient(this.editedItemId);
		this.onClear();
	}

	onClear() {
		this.editMode = false;
		this.shoppingListForm.reset();
	}
}
