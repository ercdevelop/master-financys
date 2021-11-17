import { BaseResourceModel } from "../models/base-resource.models";
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Injector } from "@angular/core";

export abstract class BaseResourceService<T extends BaseResourceModel>{

  protected http:HttpClient;

  constructor(protected apiPath:string,
              protected inector:Injector){

              this.http = inector.get(HttpClient);

  }


  getAll():Observable<T[]>{
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResources)
    )
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(catchError(this.handleError),
    map(this.jsonDataToResource)
    )

  }

  create(resource: T):Observable<T> {
    return this.http.post(this.apiPath, resource).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)

    )
  }

  update(resource: T):Observable<T> {

      const url = `${this.apiPath}/${resource.id}`;

    return this.http.put(url, resource).pipe(
      catchError(this.handleError),
      map(()=>resource)
    )
  }

  delete(id:number):Observable<T> {

    const url = `${this.apiPath}/${id}`;

  return this.http.delete(url).pipe(
    catchError(this.handleError),
    map(()=>null)
  )
}


protected jsonDataToResource(jsonData: any): T {
  return jsonData as T;
}

protected jsonDataToResources(jsonData: any[]):T[]{
const categories: T[] =[];
jsonData.forEach(element => categories.push(element as T));
return categories;

}

protected handleError(error:any):Observable<any>{
console.log("ERRO NA REQUISIÇÃO => ", error);
return throwError(error);
}


}
