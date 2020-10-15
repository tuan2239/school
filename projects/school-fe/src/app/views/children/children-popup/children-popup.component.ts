import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import gql from 'graphql-tag';
import { ChildrenService } from '../children.service';


@Component({
  selector: 'app-children-popup',
  templateUrl: './children-popup.component.html'
})
export class ChildrenPopupComponent implements OnInit {
  public isEditMode: boolean;
  public childForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    grade: new FormControl('', Validators.required)
  });
  constructor(
    public dialogRef: MatDialogRef<ChildrenPopupComponent>,
    private service: ChildrenService,
    @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
      this.isEditMode = data.children !== undefined;
      if (this.isEditMode) {
        this.childForm.controls.name.setValue(data.children.name);
        this.childForm.controls.grade.setValue(data.children.grade);
      }
  }

  public ngOnInit(): void {
  }

  public cancel(): void {
    this.dialogRef.close();
  }
  public submit(): void {
    this.isEditMode ? this.edit() : this.add();
  }

  private add(): void{
    /// nhớ viết lại cho đàng hoàng nhe cu
    const data = {
      name: this.childForm.controls.name.value,
      // tslint:disable-next-line: radix
      grade: parseInt(this.childForm.controls.grade.value)
    }
    this.service.addChild(data).subscribe(() => {
      this.dialogRef.close();
    });
  }

  private edit(): void {
    // id để edit
    const id = this.data.children.id;
    // data để edit
    const data = {
      id,
      name: this.childForm.controls.name.value,
      // tslint:disable-next-line: radix
      grade: parseInt(this.childForm.controls.grade.value)
    };
    this.service.updateChild(data).subscribe(() => {
      // chưa có edit BE nên ko có service đó
      this.dialogRef.close();
    })
  }
}
