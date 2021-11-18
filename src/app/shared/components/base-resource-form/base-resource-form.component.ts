import { AfterContentChecked, Component, Injector, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import  toastr  from 'toastr';
import {BaseResourceModel} from  '../../models/base-resource.models'
import { BaseResourceService } from '../../services/base-resource.service';

export abstract  class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle:string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean= false;

  protected route: ActivatedRoute;
  protected router:Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource:T,
    protected resourceService:BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T

  ) {
    this.route = this.injector.get(ActivatedRoute)
    this.router = this.injector.get(Router)
    this.formBuilder = this.injector.get(FormBuilder)

  }


  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;
    if (this.currentAction == "new"){
      this.createResource();

    } else {

      this.updateResource();

    }
  }

  // PRIVATE METHODS
  protected setCurrentAction(){
    if (this.route.snapshot.url[0].path == "new"){
      this.currentAction = "new"
    } else {
      this.currentAction = "edit"
    }
  }


  protected loadResource(){
    if (this.currentAction =="edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get("id")))
      )
      .subscribe(
        (resource) => {
          this.resource = resource
          this.resourceForm.patchValue(resource) // binds loaded resource data to ResourceForm
        },
        (erro) => alert('Ocorreu um erro no servidor, tente mais tarde.')

      )
    }
  }

 protected setPageTitle() {
    if(this.currentAction =="new"){
      this.pageTitle = this.creationPageTitle()
    } else {
      this.pageTitle = this.editionTitle()
    }
  }
  protected creationPageTitle(): string {
    return "Novo"
  }

  protected editionTitle(): string {
    return "Edição"
  }

protected  createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.create(resource)
    .subscribe(
      resource => this.actionForSucess(resource),
        error => this.actionsForError(error)
    )
  }


  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.update(resource)
    .subscribe(
      resource => this.actionForSucess(resource),
      error => this.actionsForError(error)
    )
  }

  actionForSucess(resource: T) {
    toastr.success("Solicitacao processada com sucesso!");
    //promisse - redirecionamento recarregamento do componente da pagina
    // o skipLocationChange evita de ficar
    const baseComponentPath = this.route.snapshot.parent.url[0].path;

    this.router.navigateByUrl(baseComponentPath, {skipLocationChange:true}).then(
      () => this.router.navigate([baseComponentPath,resource.id,"edit"])
    )
  }

  actionsForError(error: any){
     toastr.error("Ocorreu um erro ao processar a sua solicitação!");
     this.submittingForm =false;

     if (error.status === 422){
       this.serverErrorMessages = JSON.parse(error._body).errors;
     }else {
       this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, teste mais tarde"]
     }
  }

  protected abstract buildResourceForm():void;

}
