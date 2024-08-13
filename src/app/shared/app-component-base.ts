import { Component, Injector, OnDestroy } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";


@Component({
    template: '',
})
export abstract class AppComponentBase implements OnDestroy{

  spinnerService: NgxSpinnerService;

  constructor(injector: Injector) {
    this.spinnerService = injector.get(NgxSpinnerService);
  }

    ngOnDestroy(): void {
       // throw new Error("Method not implemented.");
    }
    
}