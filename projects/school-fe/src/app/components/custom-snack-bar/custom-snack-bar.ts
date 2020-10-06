import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { style } from '@angular/animations';

@Component({
  selector: 'custom-snack-bar',
  templateUrl: './custom-snack-bar.html'
})
export class CustomSnackBar {
  contents: SafeHtml;
  color: string;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackRef: MatSnackBarRef<CustomSnackBar>,
    private sanitizer: DomSanitizer
    ) { 
      this.color = data.color;
      this.contents = this.sanitizer.bypassSecurityTrustHtml(data.message)
  }
  close(){
    this.snackRef.dismiss();
  }
}