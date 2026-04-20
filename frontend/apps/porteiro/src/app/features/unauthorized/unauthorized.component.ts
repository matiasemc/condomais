import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({ selector: 'cm-unauthorized', standalone: true, imports: [RouterLink], template: '<div style="text-align:center;padding:60px"><h2>Acesso não autorizado</h2><a routerLink="/login">Voltar</a></div>' })
export class UnauthorizedComponent {}