import { Component } from '@angular/core';

interface Item {
  id: string;
  name: string;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  device!: string;
  name!: string;
  occurred!: Date;
  item: Item = {
    id: '',
    name: ''
  };

  create() {
    // Your create function logic here
  }
}
