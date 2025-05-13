import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
selector: 'app-root',
standalone: true,
imports: [RouterLink,RouterOutlet],
templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}
  title = 'med_standalone-angular';
onLogout(){
    this.authService.logout();
}
ngOnInit() {
    let isloggedin: string;
    let loggedUser: string;
    isloggedin = localStorage.getItem('isloggedIn')!;
    loggedUser = localStorage.getItem('loggedUser')!;
    if (isloggedin != "true" || !loggedUser)
      this.router.navigate(['/login']);
    else
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
  }


  
}
