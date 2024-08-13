import { Component, Inject, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerService, NgxSpinnerModule } from "ngx-spinner";
import { AppComponentBase } from './shared/app-component-base';
import { APP_CONFIG, appConfig } from './app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgxSpinnerModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent extends AppComponentBase  {
  title = 'ngRetailer';
  config: any;
  constructor(injector: Injector,@Inject(APP_CONFIG) config: typeof appConfig) {
    super(injector);
    this.config = config;
  }
}
