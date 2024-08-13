import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '../../shared/app-component-base';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill, Item, BillingProxiesService, ServiceProxiesService } from '../../shared/service-proxies.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'add-bill',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-bill.component.html',
  styleUrl: './add-bill.component.css'
})
export class AddBillComponent extends AppComponentBase {
  model: Bill = new Bill();
  id: any | undefined;
  item: Item = new Item();
  items: Item[] = [];
  searchResult: Item[] = [];
  constructor(injector: Injector,
    private BillingProxiesService: BillingProxiesService,
    private ServiceProxiesService: ServiceProxiesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    super(injector);

    this._activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      //this.isEdit =true;
    });
  }
  ngOnInit() {
    this.ServiceProxiesService.getItems().subscribe({
      next: (data) => {
        this.items = data.items;
        console.log('items : ', this.items);
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    });
  }


  SearchItem(searchTerm: any) {
    console.log('searchTerm', searchTerm.value);
    this.searchResult = this.items.filter(x => x.itemName == searchTerm.value || x.itemCode == searchTerm.value)
    this.model.itemID = this.searchResult[0].itemId;
  }

  CalTotalAmount(quantity: any) {
    if(this.model.itemID != undefined){
      if(this.searchResult.length>0){
        var result= this.searchResult.filter(x=>x.itemId == this.model.itemID)[0];
        this.model.totalAmount = quantity.value*result.salePrice!;
      }
    }
  }

  Save() {
    throw new Error('Method not implemented.');
  }
  Update() {
    throw new Error('Method not implemented.');
  }
  Search() {
    throw new Error('Method not implemented.');
  }
}
