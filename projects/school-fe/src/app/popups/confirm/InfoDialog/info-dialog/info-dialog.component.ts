import { Component, Inject } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.sass']
})
export class InfoDialogComponent{
  contents: SafeHtml;
  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
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
