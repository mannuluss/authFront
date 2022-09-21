import { Component, OnInit } from '@angular/core';
import { AuthService } from '../pages/login/auth.service';

@Component({
  selector: 'app-logout',
  template: './logout.template.html',
})
export class LogoutComponent implements OnInit {
  constructor(private Auth: AuthService) {}
  ngOnInit(): void {
    console.log("log out.....");
    this.Auth.logout();
  }
}
