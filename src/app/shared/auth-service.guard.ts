import { CanActivateFn } from '@angular/router';
import { JwtHelperServiceService } from './jwt-helper-service.service';

export const authServiceGuard: CanActivateFn = (route, state) => {
  if (JwtHelperServiceService.userId != undefined) {
    return JwtHelperServiceService.userId != undefined;
  }
  else {
    return false;
  }
};
