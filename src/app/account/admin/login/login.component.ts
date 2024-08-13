import { Component, Injector } from '@angular/core';
import { ServiceProxiesService, UsersDto } from '../../../shared/service-proxies.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AppComponentBase } from '../../../shared/app-component-base';
import { FormsModule } from '@angular/forms';
import { JwtHelperServiceService } from '../../../shared/jwt-helper-service.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends AppComponentBase {
  model: UsersDto = new UsersDto();

  constructor(
    injector: Injector,
    private loginService: LoginService,
    private _router: Router
    ) {
      super(injector);
  }

  onSubmit(): void {

    var user = new UsersDto();
    //user.id = '4FE34423-FA8B-445F-9A3D-6F236E57256D';
    user.userName = this.model.userName;
    user.password = this.model.password;

    this.spinnerService.show();
    this.loginService.authenticate(user).subscribe((result: UsersDto)=>{
      console.log('result: ',result);
      console.log('User ID : ',JwtHelperServiceService.userId);
      console.log('Sub : ',JwtHelperServiceService.sub);
      this.spinnerService.hide();
      this._router.navigate(['/host-dashboard']);
    })
  }
  
}
