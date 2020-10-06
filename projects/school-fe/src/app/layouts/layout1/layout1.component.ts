import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SidebarService } from '@webapp-svc/core/sidebar.service';

@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.scss']
})
export class Layout1Component implements OnInit, AfterViewInit {

  @ViewChild('drawer') public drawer: MatDrawer;

  constructor(private sidebarService: SidebarService) {
  }


  ngAfterViewInit(): void {
      this.sidebarService.setDrawer(this.drawer);
  }

  ngOnInit() {
  }

}
