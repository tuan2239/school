import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.sass']
})
export class ConfirmComponent{
  contents: SafeHtml;
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) {
      
      this.contents = this.sanitizer.bypassSecurityTrustHtml(data.message);
    }

  no(): void {
    this.dialogRef.close(false);
  }
  yes(): void {
    this.dialogRef.close(true);
  }
}
