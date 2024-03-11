import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

interface Item {
  id: string;
  name: string;
}

enum Name {
  'View Item' = 'View Item',
  'Add To Cart' = 'Add To Cart',
  'Purchase' = 'Purchase',
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  device!: string;
  name!: Name;
  occurred!: Date;
  item: Item = {
    id: '',
    name: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
  }

  create(eventForm: NgForm) {
    if (eventForm.invalid) {
      return;
    }

    const occurredControl = eventForm.controls['occurred'];
    if (this.dateValidator()(occurredControl)) {
      occurredControl.setErrors({ invalidDate: true });
      return;
    }

    // console.log(eventForm.value);
    // console.log(this.occurred);

    this.apiService.create(this.device, this.name, this.occurred, this.item.id, this.item.name)
    .subscribe(
      (response) => {
        this.toastr.success('Event created successfully', 'Success');
        eventForm.reset();
      },
      (error) => {
        this.toastr.error(error.error.message.join(', '), 'Error');
      }
    );
  }

  // Validate date in frontend first
  dateValidator() {
    return (control: any) => {
      const value = control.value;
      // Regular expression to match ISO 8601 date format
      const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
      if (!isoDatePattern.test(value)) {
        return { invalidDate: true };
      }
      return null;
    };
  }
}
