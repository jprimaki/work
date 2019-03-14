import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService, ContactData } from '../shared/contact.service';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { NewupdateComponent } from '../contact/newupdate/newupdate.component'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  entryComponents: [ NewupdateComponent ]
})

export class ContactComponent implements OnInit {
  public formGroup: FormGroup;
  displayedColumns: string[] = ['select', 'name', 'phone', 'email'];
  selection = new SelectionModel<ContactData>(true, []);    
  dataSource: MatTableDataSource<ContactData>;
  user: ContactData[] = [{id: "1", contactName: "teste", email: "jonathanprimaki@gmail.com", phone: ""}, {id: "1", contactName: "teste2", email: "", phone: ""}];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: ContactService, public dialog: MatDialog)  { 
    this.formGroup = service.form;    
    
    this.dataSource = new MatTableDataSource(this.user);    
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClear() {
    this.formGroup.reset();
  }

  onSave() {
    if (this.formGroup.invalid) {
      return;
    }
    console.log(this.formGroup.controls.fullName.value);
  }

  oneSelected() {
    return this.selection.selected.length == 1;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
 
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  add(): void {    
    this.openDialog(null);  
  } 
  
  edit(): void {    
    this.openDialog(this.selection.selected[0]);
  }

  openDialog (data: ContactData) : void {
    const dialogRef = this.dialog.open(NewupdateComponent, {
      width: '400px',
      data      
    });
  }

}
