import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContactData } from 'src/app/shared/contact.service';

@Component({
  selector: 'app-newupdate',
  templateUrl: './newupdate.component.html',
  styleUrls: ['./newupdate.component.css']
})
export class NewupdateComponent implements OnInit {
  buttonName = "Salvar";  
  type = "Cadastrar novo usuário"
  localData: ContactData;

  constructor(public dialogRef: MatDialogRef<NewupdateComponent>, @Inject(MAT_DIALOG_DATA) public data: ContactData) { 
    this.localData = {id: "", contactName: "", email: "", phone: ""};
      if (data != null) {
        this.buttonName = "Editar";        
        this.type = "Editar"
        this.localData = data;
      }
  }

  ngOnInit() {    
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
