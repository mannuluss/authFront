import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SvgSolsticioComponent } from './logout/svg/solsticio.component';



@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    LogoutComponent,
    SvgSolsticioComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class AuthModule { }
