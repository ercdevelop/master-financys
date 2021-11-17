import { element } from 'protractor';
import { CategoryService } from './../../categories/shared/category.service';
import { Entry } from './entry.models';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Observable } from 'rxjs';
import {  flatMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(protected injector: Injector, private categoryService:CategoryService) {
    super('api/entries', injector, Entry.fromJson)
  }

  create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(categoryflat => {
        entry.category = categoryflat;
        return super.create(entry)
      })
    )
  }

  update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(categoryFlat => {
          entry.category = categoryFlat
        return super.update(entry)
      })
    )
  }



}
