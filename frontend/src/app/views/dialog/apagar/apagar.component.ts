import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-apagar',
  templateUrl: './apagar.component.html',
  styleUrls: ['./apagar.component.css']
})
export class ApagarComponent {

  public mensagem: string;
  constructor(public dialogRef: MatDialogRef<ApagarComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  fechar(): void {
    this.dialogRef.close(true);
  }

  confirmar(): void {
    this.dialogRef.close(false);
  }

}
