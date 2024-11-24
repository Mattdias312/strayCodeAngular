import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../_models/category';
import { CategoryFormComponent } from "../_models/category-form/category-form.component";

@Component({
    selector: 'app-category.edit',
    standalone: true,
    templateUrl: './category.edit.component.html',
    styleUrl: './category.edit.component.scss',
    imports: [CategoryFormComponent]
})
export class CategoryEditComponent implements OnInit {

  @Input() public actionName = 'Editar';

  public editableCategory!: Category;

  constructor(private dialoRef: MatDialogRef<CategoryEditComponent>,
             @Inject(MAT_DIALOG_DATA) dialogData: any)
             {

    if(dialogData.editableCategory != null) {
      this.editableCategory = dialogData.editableCategory
    }

    if(dialogData.actionName != null) {
      this.actionName = dialogData.actionName
    }

  }

  ngOnInit(): void {

  }

  public closeModalWindows($event: any) {
    if($event){
      this.dialoRef.close();
    }
  }

}
