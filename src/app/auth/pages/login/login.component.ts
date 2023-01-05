import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './usuario';
import { AuthService } from './auth.service';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2: any;
  usuario: Usuario | null;
  siging: boolean = false;
  errorLogin?: string = undefined;

  // public loginForm = this.fb.group({
  //   Usuario: [ '' , [ Validators.required, Validators.email ] ],
  //   password: ['', Validators.required ],
  //   remember: [false]
  // });

  public loginForm = this.fb.group({
    Usuario: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      console.log('ya esta logueado');
      /*if (this.router['browserUrlTree'].queryParams.link) {
        location.href = this.router['browserUrlTree'].queryParams.link;
      } else {*/
      this.redirect(this.authService.usuario);
      //}
    }
  }

  login(): void {
    this.usuario!.username = this.loginForm.value.Usuario!;
    this.usuario!.password = this.loginForm.value.password!;
    if (this.usuario?.username == null || this.usuario?.password == null) {
      //Swal('Error Login', 'Username o password vacías!', 'error');
      console.log('credenciales vacias');
      return;
    }

    this.siging = true;
    this.errorLogin = undefined;
    this.authService.login(this.usuario).subscribe(
      (response) => {
        console.log(response);

        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario = this.authService.usuario;

        this.redirect(usuario);
      },
      (err) => {
        this.errorLogin = 'contraseña o usuario incorrectas.';
        this.siging = false;
      }
    );
  }

  redirect(usuario: Usuario) {
    if (usuario?.roles?.includes('ROLE_ADMIN')) {
      location.href = environment.urlFrontAdmin;
    } else {
      location.href = environment.urlFrontUser;
    }
  }
}
