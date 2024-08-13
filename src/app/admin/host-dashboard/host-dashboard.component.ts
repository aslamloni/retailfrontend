import { Component, Inject, Injector } from '@angular/core';
import { AppComponentBase } from '../../shared/app-component-base';
import { Router,RouterOutlet } from '@angular/router';

@Component({
  selector: 'host-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './host-dashboard.component.html',
  styleUrl: './host-dashboard.component.css'
})
export class HostDashboardComponent extends AppComponentBase {

  constructor(injector: Injector,private _router: Router) {
    super(injector);
  }
  
  ngOnInit() {
  }

  addNewItem() {
    this._router.navigate(['/add-item']);
  }


}
