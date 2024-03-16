import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {CommonModule} from "@angular/common";
import {Toast} from "bootstrap";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NavbarComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit{
  dataForm!: FormGroup;
  dataList: any[] = [];
  checkRequired: boolean=false;

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.dataForm = this.fb.group({
      id: [],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  loadData(): void {
    this.dataService.getAll().subscribe(data => {
      this.dataList = data;
    });
  }

  onSubmit() {
    if (this.dataForm.valid) {
      const formData = this.dataForm.value;
      if (this.dataList.find(user=>user?.id===this.dataForm.value?.id) ){
        // Update operation
        this.dataService.update(formData?.id, formData).subscribe(response => {
          console.log('Data updated successfully:', response);
          this.resetForm();
          this.loadData();
        });
      } else {
        // Create operation
        this.dataService.create(formData).subscribe(response => {
          console.log('Data created successfully:', response);
          this.resetForm();
          this.loadData();
        });
      }
    } else {
      console.error('Form is invalid.');
      this.checkRequired=true;

    }
  }

  onDelete(id: number, $event: MouseEvent): void {
    $event.stopPropagation();
    if (confirm('Are you sure you want to delete this data?')) {
      this.dataService.delete(id).subscribe(response => {
        console.log('Data deleted successfully:', response);
        this.loadData();
      });
    }
  }
  resetForm(): void {
    this.dataForm.reset();
    this.dataForm.patchValue({id:null});
    this.checkRequired=false;
  }

  patchToUpdate(user: any) {
    this.dataForm.patchValue({id:user?.id,first_name:user?.first_name,last_name:user?.last_name,age:user?.age,gender:user?.gender})
  }
}
