import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, AuthState } from '@condomais/core';
@Component({
  selector: 'cm-login', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [FormsModule],
  template: `<div class='w'><div class='c'><h1>Admin</h1>@if(state.error()){<p class='e'>{{state.error()}}</p>}<input type='email' [(ngModel)]='email' placeholder='E-mail'/><input type='password' [(ngModel)]='password' placeholder='Senha'/><button (click)='login()' [disabled]='state.isLoading()'>{{state.isLoading()?'Aguarde…':'Entrar'}}</button></div></div>`,
  styles: ['.w{display:flex;align-items:center;justify-content:center;min-height:100vh}.c{background:#fff;padding:40px;border-radius:12px;display:flex;flex-direction:column;gap:14px;min-width:300px}input{padding:10px 14px;border:1.5px solid #ddd;border-radius:8px;font-size:15px}button{padding:12px;background:#2d6a4f;color:#fff;border:none;border-radius:8px;cursor:pointer}.e{color:#c0392b;font-size:13px;margin:0}']
})
export class LoginComponent { auth=inject(AuthService); state=inject(AuthState); email=""; password=""; login(){this.auth.login(this.email,this.password);} }