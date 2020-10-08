import gql from 'graphql-tag';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ASCGridConfigData } from '@webapp-components/asc-grid/asc-grid.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  public children: any;
  public configData: ASCGridConfigData = {
    colHeadNames: ['STT', 'Name', 'Grade'],
    colFieldNames: ['name', 'grade'],
    colFieldTypes: ['string','string'],
    buttons: [
      {
        color: 'primary',
        tooltip: 'Sửa',
        icon: 'create',
        functionName: 'edit'
      },
      {
        color: 'warn',
        tooltip: 'Xóa',
        icon: 'clear',
        functionName: 'delete'
      }
    ]
  }

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.apollo.query({
      query: gql`
        {
          children{
            id
            name
            grade
          }
        }
      `
    }).subscribe((resp: any) => {
      this.children = resp.data.children;
    });
  }
  public pageEvent(pageE: any): void {
    // this.filter.PageIndex = pageE.pageIndex + 1;
    // this.filter.PageSize = pageE.pageSize;
    // this.loadGrid();
  }
  public buttonClick(eventInfo: any): void{
    switch(eventInfo.functionName){
      case 'edit':
        this.edit(eventInfo.item)
        break;
      case 'delete':
        this.delete(eventInfo.item)
        break;
    }
  }
  public edit(item: any): void{ 
    alert('edit' + item.id);
  }
  delete(item: any){ 
    alert('delete' + item.id);
  }

}
