import { Component, Injector, EventEmitter, Output } from '@angular/core';
import { AppComponentBase } from '../../shared/app-component-base';
import { Router } from '@angular/router';
import { Item, ServiceProxiesService } from '../../shared/service-proxies.service';
import { FormsModule } from '@angular/forms';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'item-details',
  standalone: true,
  imports: [FormsModule, AddItemComponent],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent extends AppComponentBase {
//[x: string]: any;
  item: Item = new Item();
  items: Item[] = [];

  constructor(injector: Injector,
    private ServiceProxiesService: ServiceProxiesService,
    private _router: Router
  ) {
    super(injector)
  }

  ngOnInit() {
    this.spinnerService.show();

    this.ServiceProxiesService.getItems().subscribe({
      next: (data) => {
        this.items = data.items;
        console.log('items : ',this.items);
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    });
  }

  EditItem(item:Item){
    this._router.navigate(['/host-dashboard/add-item', { id: item.itemId }]);
  }

  Delete(item:Item) {
    this.spinnerService.show();
    this.ServiceProxiesService.deleteItem(item).subscribe({
      next: (data) =>{
        this.spinnerService.hide();
        this.ngOnInit();
      },
      error: (error)=>{
        this.spinnerService.hide();
      }
    })
    }

}
