import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '../../shared/app-component-base';
import { Router } from '@angular/router';
import { Bill, BillingProxiesService } from '../../shared/service-proxies.service';

@Component({
  selector: 'billing-details',
  standalone: true,
  imports: [],
  templateUrl: './billing-details.component.html',
  styleUrl: './billing-details.component.css'
})
export class BillingDetailsComponent extends AppComponentBase {
  bill: Bill = new Bill();
  bills: Bill[] = [];
  constructor(injector: Injector,
    private BillingProxiesService: BillingProxiesService,
    private _router: Router
  ) {
    super(injector)
  }
  ngOnInit() {
    this.spinnerService.show();
    this.BillingProxiesService.getBills().subscribe({
      next: (data) => {
        this.bills = data.bills;
        console.log('data.bills :',data.bills);
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    });
  }

  EditItem(item: any) {
    throw new Error('Method not implemented.');
    }
    Delete(item: any) {
    throw new Error('Method not implemented.');
    }

}
