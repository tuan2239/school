import { AuthenticationService } from '@webapp-svc/core/authentication.service';
import { SidebarService } from '@webapp-svc/core/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { getToken } from '@webapp-helpers/token.helper';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  userInfo: any
  constructor(
    private sidebarService: SidebarService,
    private auth: AuthenticationService,
    private router: Router
  ) {

  }
  ngOnInit() {
    this.userInfo = getToken() || {name: 'No name'};
  }
  toggleRightSidenav() {
    this.sidebarService.toggle();
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/auth/sign-in']);
  }
}
