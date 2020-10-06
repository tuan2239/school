import { AuthenticationService } from '@webapp-svc/core/authentication.service';
import { SidebarService } from '@webapp-svc/core/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

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
    this.userInfo = JSON.parse(localStorage.getItem('currentUser')) || {fullName: 'No name'};
  }
  toggleRightSidenav() {
    this.sidebarService.toggle();
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/dangnhap']);
  }
}
