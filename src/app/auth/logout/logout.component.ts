import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../pages/login/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  get svgElement(): Element {
    return document.querySelector('#Group');
  }

  constructor(private Auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('log out.....');
    this.Auth.logout();
  }

  exit() {
    window.location.href = environment.urlFrontUser;
  }
}
