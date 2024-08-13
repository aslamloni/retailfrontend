import * as jwtDecode from 'jwt-decode';

export class JwtHelperServiceService{

  static token: any | undefined = localStorage.getItem('token' || '{}')?.toString();

  //static admintoken: string = JSON.parse(localStorage.getItem('token') || '{}');
  static decodedToken: any= jwtDecode.jwtDecode(JwtHelperServiceService.token);
  
  // Extract user ID
  static userId: any = JwtHelperServiceService.decodedToken.sid;
  static sub: any = JwtHelperServiceService.decodedToken.sub;
}

