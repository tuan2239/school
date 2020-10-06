import { Injectable, NgZone } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
// import 'bootstrap-notify';
// declare var $: any;
// import * as $ from 'jquery';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBar } from '../../components/custom-snack-bar/custom-snack-bar';
// import { Md5 } from 'ts-md5/dist/md5';
// import { SORD_DIRECTION } from '../models/sort';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {
  constructor(
    private router: Router,
    private matCus: MatPaginatorIntl,
    private _snackBar: MatSnackBar,
    private zone: NgZone
  ) { }

  padLeft(text: string, padChar: string, size: number): string {
    return (String(padChar).repeat(size) + text).substr((size * -1), size);
  }

  padIntegerLeftWithZeros(rawInteger: number, numberOfDigits: number): string {
    let paddedInteger: string = rawInteger + '';
    while (paddedInteger.length < numberOfDigits) {
      paddedInteger = '0' + paddedInteger;
    }
    return paddedInteger;
  }

  rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ?
      "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  }

  // md5Encode(str: number | string): string {
  //   let s: string = (str) ? ('' + str) : '';
  //   const md5 = new Md5();
  //   let result: any = md5.appendStr(s).end();
  //   if (result instanceof Int32Array) {
  //     result = result.join('');
  //   }
  //   return result.toUpperCase();
  // }



  doNothing(): void { }

  getColumnValue(obj: any, colIndex: number, columnsNameVi: any[]): any {
    return obj[columnsNameVi[colIndex]];
  }

  isAValidDate(_date: any): boolean {
    _date = _date.toString();
    const _regExp = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$');
    return _regExp.test(_date);
  }

  getColumnValueWithDateTimeAble(obj: any, colIndex: number, columnsNameVi: any[]): any {
    if (this.isAValidDate(obj[columnsNameVi[colIndex]])) {
      return { value: obj[columnsNameVi[colIndex]], isDateType: true };
    }
    return { value: obj[columnsNameVi[colIndex]], isDateType: false };
  }

  stringDate(date: any, slash = false, noYear = false) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return slash ? (noYear ? [day, month].join('/') : [day, month, year].join('/')) : [year, month, day].join('-');
  }
  weekNumber(inputDate: Date): number {
    return inputDate.getDay();
  }


  yearsList(value: any, type: number | null = 1): Observable<any[]> {
    let list: any[] = [];

    for (let i = 1975; i <= 2100; i++) {
      list.push({
        value: i, title: '' + i
      });
    }

    if (type == 1) {
      return of(list.filter((month: any) => value == '' || value == undefined || month.title.toLowerCase().indexOf(value.toString()) != -1));
    } else {
      return of(list.filter((month: any) => value == '' || value == undefined || month.value.toString().toLowerCase() == value.toString()));
    }
  }


  //notification

  showNotification(from, align, message, colorindex?) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = colorindex || Math.floor((Math.random() * 4) + 1);
    this.zone.run(() => {
      this._snackBar.openFromComponent(CustomSnackBar,{
        data: {message: message, color: type[colorindex]},
        duration: 3000,
        horizontalPosition: align,
        verticalPosition: from
      })
    })
  }

  FormatString(str: string, ...val: string[]) {
    for (let index = 0; index < val.length; index++) {
      str = str.replace(`{${index}}`, val[index]);
    }
    return str;
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  objectToString(object) {
    if (typeof (object) == 'object') return '';
    return object;
  }
  // md5Encode(str: number | string): string {
  //   let s: string = (str) ? ('' + str) : '';
  //   const md5 = new Md5();
  //   let result: any = md5.appendStr(s).end();
  //   if (result instanceof Int32Array) {
  //     result = result.join('');
  //   }
  //   return result.toUpperCase();
  // }
  createCopy(objectToCopy: any): any {
    return (JSON.parse(JSON.stringify(objectToCopy)));
  }
  formatThousandNumber(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  thousandFormatToNumber(n: string) {
    return parseInt(n.replace(/,/g, ''));
  }
  parseResponse(response: string) {
    return JSON.parse('{"' + response.replace(/;/g, '", "').replace(/=/g, '": "') + '"}');
  }
  chooseAvatar() { document.getElementById('fileImg').click(); }
  chooseFile() { document.getElementById('file-selector').click(); }
  decentralizedScreen(screenRoute: string){
    let decentralization = JSON.parse(localStorage.getItem('decentralizedMenu')).find((x: any)=>x.routerMapping == screenRoute);
    if(!decentralization || !decentralization.allowRead){
      this.router.navigate(['/unauthorized']);
    }
    return decentralization;
  }
  
  updateMatTableLabel() {
    this.matCus.itemsPerPageLabel = 'Số mục trên trang';
    this.matCus.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return 'Không có mục nào';
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} trên ${length}`;
    }
  }
  
  notifyResponse(resp: {status: number, message: string}){
    this.showNotification('top','right',resp.message, resp.status == 0 ? 2 : 4);
  }

  

}  