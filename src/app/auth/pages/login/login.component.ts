import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './usuario';
import { AuthService } from './auth.service';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';



declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;
  usuario: Usuario | null;

  // public loginForm = this.fb.group({
  //   Usuario: [ '' , [ Validators.required, Validators.email ] ],
  //   password: ['', Validators.required ],
  //   remember: [false]
  // });

  public loginForm = this.fb.group({
    Usuario: [ '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
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
      // this.router.navigate(['/home']);
      location.href = environment.urlFrontUser;
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

    this.authService.login(this.usuario).subscribe(response => {
      //console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      // TODO: definir ruta luego del login
      // this.router.navigate(['/general']);
      if(usuario?.roles?.includes('ROLE_ADMIN')){
        location.href = environment.urlFrontAdmin;
      } else {
        location.href = environment.urlFrontUser;
      }
      //location.href = environment.urlFrontUser;

      //console.log('inicio con exito');
      //swal('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
    }, err => {
      if (err.status == 400) {
       // console.log('credenciales incorrectas');
        // this._snackBar.open('Usuario o clave incorrectas!!', 'OK', {
        //   duration: 4 * 1000,
        //   horizontalPosition: end,
        //   // verticalPosition: top

        // });
        console.log("credenciales incorrectas");
      }
    }
    );
  }

}


