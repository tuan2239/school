import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent  {
  loadSidebar = false;
  url = '/';
  constructor(http: HttpClient, router: Router){
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    })
    // if(!localStorage.getItem('decentralizedMenu')){
    //   this.loadSidebar = true;
    //   http.get(`${environment.apiUrl}v1.0/Authenticate/GetMenu`).subscribe((data: any) => {
    //     localStorage.setItem('decentralizedMenu', JSON.stringify(data));
    //     this.getMenu();
    //     this.loadSidebar = false;
    //   });
    // }
    // else this.getMenu();
  }
  // menuData = [];
  menuData = [
    {
      title: 'Dashboard',
      link: '/quantrivien',
      hasChild: false,
      icon: 'home'
    },
    {
      title: 'Import kết quả thi',
      link: '/quantrivien/importketquathi',
      hasChild: false,
      icon: 'import_export'
    },
    {
      title: 'Quản lý tra cứu văn bằng',
      link: '/quantrivien/quanlytracuuvanbang',
      hasChild: false,
      icon: 'image_search'
    },
    {
      title: 'Tài liệu online',
      link: '/',
      hasChild: true,
      icon: 'article',
      childrens: [
        {
          title: 'Trang chủ',
          link: '/quantrivien/tailieuonline/trangchu'
        },
        {
          title: 'Tra cứu tài liệu',
          link: '/quantrivien/tailieuonline/tracuutailieu'
        },
        {
          title: 'Đội ngũ support',
          link: '/quantrivien/tailieuonline/doingusupport'
        },
        {
          title: 'Câu hỏi thường gặp',
          link: '/quantrivien/tailieuonline/cauhoithuonggap'
        }
      ]
    },
    {
      title: 'Phân công chuyên môn',
      link: '/quantrivien/phancongchuyenmon',
      hasChild: false,
      icon: 'dns'
    },
    {
      title: 'Quản lý môn thi (Demo)',
      link: '/quantrivien/monthi',
      hasChild: false,
      icon: 'subject'
    }
  ];
  getMenu(){
    let data = JSON.parse(localStorage.getItem('decentralizedMenu'));
    const list = [];
    if (data) {
      data = data.sort((a, b) => a.displayOrder - b.displayOrder);
      data.filter((x: any) => x.parentId == null).forEach(element => {
        list.push({
          title: element.screenName,
          link: element.routerMapping,
          hasChild: true,
          icon: element.icon != null ? element.icon : 'assignment_returned',
          childrens: []
        });
        const mychildrens = data.filter((x: any) => x.parentId == element.id);
        if(mychildrens.length === 0) {
          delete list[list.length - 1].childrens;
          list[list.length - 1].hasChild = false;
        }
        mychildrens.forEach((childElement: any) => {
          list[list.length - 1].childrens.push({
            title: childElement.screenName,
            link: childElement.routerMapping,
          });
        });
      });
    }

    this.menuData = list;
  }
  hasChildActive(listChildrens: any[]){
    return listChildrens.filter(x => x.link == this.url).length > 0;
  }
}
