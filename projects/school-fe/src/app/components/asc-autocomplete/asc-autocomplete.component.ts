import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize, map, startWith, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'asc-autocomplete',
    templateUrl: './asc-autocomplete.component.html',
    styleUrls: ['./asc-autocomplete.component.sass']
})
export class ASCAutocomplete implements OnInit{
    @Input() getListAC: (value: any) => Observable<any>;
    @Input() label: string;
    @Input() placeholder: string;
    @Input() required: boolean;

    @Input() ascModel: FormControl;
    @Output() ascModelChange = new EventEmitter<FormControl>();
    @ViewChild('input') input: ElementRef;

    listObservable: Observable<any>;
    isLoading = false;
    buttonIsShow = () => this.ascModel.value != null && this.ascModel.value != '' && this.ascModel.value.id != null;
    ngOnInit(): void {
        if(!this.placeholder) this.placeholder = '';
        this.listObservable = this.ascModel.valueChanges.pipe(
            startWith(''),
            tap(() => {
                this.isLoading = true;
            }),
            map(value => typeof value === 'string' ? value : ''),
            switchMap(value => this.getListAC(value)
                .pipe(
                    map(resp => resp),
                    finalize(() => {
                        setTimeout(() => {
                            this.isLoading = false;
                        }, 1000);
                    })
                )
            )
        );
    }
    displayFn(obj): string {
        return obj && obj.text && obj.id != null ? obj.text : '';
    }
    optionSelected(){
        this.ascModelChange.emit(this.ascModel);
    }
    panelClosed(){
        if(this.ascModel.value == null || !this.ascModel.value.id) {
            this.ascModel.setValue(null);
            this.input.nativeElement.blur();
        }
    }
}