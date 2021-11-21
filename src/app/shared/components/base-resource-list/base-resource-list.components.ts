import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { BaseResourceModel } from '../../models/base-resource.models';


export class BaseResourceListComponent<T extends BaseResourceModel> {

  resources: T[] = []

  constructor( private baseResourceService: BaseResourceService<T>) {

  }

  ngOnInit() {
    this.baseResourceService.getAll().subscribe(
      resources => this.resources = resources.sort((a,b)=> b.id -a.id),
      error=> alert('Erro ao carregar a lista')
    )

  }

  deleteResource(entry){

    const mustDelete = confirm('Deseja realmente excluir este intem?');

    if (mustDelete){

          this.baseResourceService.delete(entry.id).subscribe(
            ()=> this.resources = this.resources.filter(element => element != entry),
            ()=> alert("Erro ao tentar excluir!")
          )
    }

  }

}
