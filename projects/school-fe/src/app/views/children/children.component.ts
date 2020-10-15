import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ASCGridConfigData } from '@webapp-components/asc-grid/asc-grid.component';
import { ConfirmComponent } from '@webapp-popups/confirm/confirm.component';
import { ChildrenPopupComponent } from './children-popup/children-popup.component';
import { ChildrenService } from './children.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html'
})
export class ChildrenComponent implements OnInit {
  public children: any;
  public searchAdvanced: boolean = true;
  public configData: ASCGridConfigData = {
    colHeadNames: ['STT', 'Tên', 'Lớp'],
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
    private service: ChildrenService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.load();
  }
  public load(): void {
    this.service.getChildren().valueChanges.subscribe((resp: any) => {
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
  public add(): void{
    this.openDialog();
  }
  public edit(item: any): void{
    this.openDialog(item);
  }
  public delete(item: any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '750px',
      data: {
        height: '500px',
        title: 'Delete',
        message: 'Delete ' + item.id,
        id: item.id
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      // chạy sau khi đóng popup
    });
  }
  private openDialog(children?: any) {
    const dialogRef = this.dialog.open(ChildrenPopupComponent, {
      width: '750px',
      data: {
        height: '500px',
        title: 'Thông tin trẻ em',
        children
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      // chạy sau khi đóng popup
    });
  }
}
