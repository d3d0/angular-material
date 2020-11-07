import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-prod',
  templateUrl: './delete-prod.component.html',
  styleUrls: ['./delete-prod.component.css']
})
export class DeleteProdComponent implements OnInit {
  
  id:string;
  name:string;

  constructor(
    public dialogRef: MatDialogRef<DeleteProdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.id = data.prodId;
      this.name = data.prodName;
      console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
