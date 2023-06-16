import { Component } from '@angular/core';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
})
export class DatepickerComponent {
  modelInicial: NgbDateStruct;
  modelFinal: NgbDateStruct;

  constructor() {
    this.modelInicial = {} as NgbDateStruct;
    this.modelFinal = {} as NgbDateStruct;
  }
}
