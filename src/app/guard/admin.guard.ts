import { CanActivateFn } from '@angular/router';
import { UserService } from '../Service/userService/user.service';
import { inject } from '@angular/core';
import { JwtDecodeService } from '../jwtDecode/jwt-decode.service';


export const adminGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);
  const jswService = inject(JwtDecodeService);

  let token = localStorage.getItem('token')?.toString();
  let userRole = jswService.decodeToken(token!);
  let role = userRole.role
  let isLoggedIn = userService.isLoggedIn();

  // Admin protection I get the token and check if the role is admin

  if (isLoggedIn && role == 'Admin') {

    return true;

  } else {

    return false;

  }



};
