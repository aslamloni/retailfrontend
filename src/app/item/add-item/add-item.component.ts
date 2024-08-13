import { Component, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../shared/app-component-base';
import { Item, ServiceProxiesService } from '../../shared/service-proxies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JwtHelperServiceService } from '../../shared/jwt-helper-service.service';

@Component({
  selector: 'add-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent extends AppComponentBase {
  model: Item = new Item();
  id:any | undefined;
  //isEdit: boolean =false;
  constructor(injector: Injector,
    private ServiceProxiesService: ServiceProxiesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
    ) {
    super(injector);

    this._activatedRoute.params.subscribe(params => {
      this.id =params['id'];
      //this.isEdit =true;
    });
  }
  
  ngOnInit() {
    if(this.id !=undefined){
      this.spinnerService.show();

    this.ServiceProxiesService.getItem(this.id).subscribe({
      next: (data) => {
        console.log('data : ',data);
        this.model = data.items[0];
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    });
    }
  }

  Save(){
    let item = new Item();
    item.itemName = this.model.itemName;
    item.itemCode =this.model.itemCode;
    item.location =this.model.location;
    item.salePrice =this.model.salePrice;
    item.purchasePrice =this.model.purchasePrice;
    item.discountPrice =this.model.discountPrice;
    item.cgst = this.model.cgst;
    item.sgst =this.model.sgst;
    item.userID = JwtHelperServiceService.userId
    this.spinnerService.show();
    this.ServiceProxiesService.CreateOrUpdateItem(item).subscribe({
      next: (data)=>{
        console.log('data: ', data);
        this._router.navigate(['/host-dashboard/item-details']);
        this.spinnerService.hide();
      },
      error: (error)=>{
        console.log('error: ',error);
        this.spinnerService.hide();
      }
    })
  }

  Update(){
    let item = new Item();
    item.itemId = this.model.itemId;
    item.itemName = this.model.itemName;
    item.itemCode =this.model.itemCode;
    item.location =this.model.location;
    item.salePrice =this.model.salePrice;
    item.purchasePrice =this.model.purchasePrice;
    item.discountPrice =this.model.discountPrice;
    item.cgst = this.model.cgst;
    item.sgst =this.model.sgst;
    item.userID = JwtHelperServiceService.userId

    this.ServiceProxiesService.EditItem(item).subscribe({
      next: (data)=>{
        console.log('data: ', data);
        this._router.navigate(['/host-dashboard/item-details']);
        this.spinnerService.hide();
      },
      error: (error)=>{
        console.log('error: ',error);
        this.spinnerService.hide();
      }
    })
  }

}
