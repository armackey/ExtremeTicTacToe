import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { HeaderComponent } from './header/header.component';
import { SharedService } from './services/shared.service';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component'
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { GameslistComponent } from './gameslist/gameslist.component';
import { AngularFireDatabaseModule, AngularFireDatabase, } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { User } from './user/user';
import { GameComponent } from './game/game.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'games',
    component: GameslistComponent
  },
  {
    path: '',
    component: GameComponent
  },
  {
    path:'**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    GameslistComponent,
    GameComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [SharedService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
