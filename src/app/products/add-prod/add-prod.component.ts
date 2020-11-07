import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent implements OnInit {

  buttonDisabled = false;

  public title: string = ``;
  public category: string = ``;
  public price: number;
  public employee: string = ``;
  public desc: string = ``;

  
  public addCusForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddProdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.buttonDisabled = true;
    this.addCusForm = this.fb.group({
      // title: [this.title, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      // price: [this.price, [Validators.required, Validators.pattern("^[0-9]*$")]],
      title: [this.title, [Validators.required, Validators.pattern('[a-zA-Zàèéìòóù]+([a-zA-Z0-9àèéìòóù ]+)*')]],
      category: [this.category, [Validators.required, Validators.pattern('[a-zA-Zàèéìòóù]+([a-zA-Zàèéìòóù]+)*')]],
      price: [this.price, [Validators.required, Validators.pattern("^[+-]?(([0-9]+(\,[0-9]*)?))$")]],
      employee: [this.employee, [Validators.required, Validators.pattern('[a-zA-Zàèéìòóù]+([a-zA-Zàèéìòóù]+)*')]],
      description: [this.desc, []],
    });
  }

  // SAVE
  // onAddCus(): void {
  //   this.markAsDirty(this.addCusForm.value);
  // }
  // CLOSE
  // openDialog(): void {
  //   if(this.addCusForm.dirty) {
  //     // ...
  //   } else {
  //     this.dialog.closeAll();
  //   }
  // }
  // private markAsDirty(group: FormGroup): void {
  //   group.markAsDirty();
  //   for (const i in group.controls) {
  //     group.controls[i].markAsDirty();
  //   }
  // }

  save() {
      // console.log(this.addCusForm.value);
      this.dialogRef.close(this.addCusForm.value);
  }

  close(): void {
      this.dialogRef.close();
  }

}
