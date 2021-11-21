import { BaseResourceListComponent } from './../../../shared/components/base-resource-list/base-resource-list.components';
import { CategoryService } from './../shared/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {

  constructor(private categorieService: CategoryService) {
    super(categorieService);
  }

}

