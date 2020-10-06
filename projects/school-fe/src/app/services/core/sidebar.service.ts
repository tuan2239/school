import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({providedIn: 'root'})
export class SidebarService {
    drawer: MatDrawer;
    constructor() { }

    setDrawer(drawer: MatDrawer){
        this.drawer = drawer;
    }
    toggle(){
        this.drawer.toggle();
    }

    getNam() { return 'name';}
}