import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export class ASCGridConfigData{
    colHeadNames: string[]
    colFieldNames: string[]
    colFieldTypes: string[]
    buttons?: ASCGridButton[]
}
export class ASCGridButton{
    color: string;
    tooltip: string;
    icon: string;
    functionName: string;
}
@Component({
    selector: 'asc-grid',
    templateUrl: './asc-grid.component.html'
})
export class ASCGridComponent implements OnInit {
    @Input() data: any[];
    @Input() config: ASCGridConfigData;
    @Input() length: number;
    @Input() pageIndex: number;
    @Input() pageSize: number;
    @Output() pageChange = new EventEmitter<any>();
    @Output() buttonClick = new EventEmitter<any>();

    ngOnInit(): void {

    }
    pageEvent(event: any){
        this.pageChange.emit(event);
    }
    buttonClickFn(functionName: string, item: any){
        this.buttonClick.emit({functionName: functionName, item: item});
    }
}