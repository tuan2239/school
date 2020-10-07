import { startWith, map, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class AutoComplete {
  control = new FormControl();
  list: any[];
  isLoading: boolean;
  change(value: any){}
  displayFn(object: any): string {return '';  }

  loadAutoComplete(getListAC: (value: any) => Observable<any>) {
    this.control.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.list = [];
          this.isLoading = true;
        }),
        switchMap(value => getListAC(value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((response: any) => {
        const data = response.results;
        if (data === undefined) {
          this.list = [{ notfound: 'Không có dữ liệu' }];
        } else {
          this.list = data.length ? data : [{ notfound: 'Không có dữ liệu' }];
        }
      });
  }
  constructor() {}
}
