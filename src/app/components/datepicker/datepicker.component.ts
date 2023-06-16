import { Component } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
})
export class DatepickerComponent {
  modelInicial!: NgbDateStruct;
  modelFinal!: NgbDateStruct;

  fechaInicial!: NgbDateStruct;
  fechaFinal!: NgbDateStruct;

  constructor(private ngbDateParserFormatter: NgbDateParserFormatter) {}

  onDateSelect(date: NgbDateStruct, inputId: string) {
    if (inputId === 'dpInicial') {
      this.modelInicial = date;
      this.fechaInicial = this.ngbDateParserFormatter.parse(this.ngbDateParserFormatter.format(date))!;
    } else if (inputId === 'dpFinal') {
      this.modelFinal = date;
      this.fechaFinal = this.ngbDateParserFormatter.parse(this.ngbDateParserFormatter.format(date))!;
    }
  }
  

  onInputChange(event: Event, inputId: string) {
    const inputValue = (event.target as HTMLInputElement).value;
    const parsedDate = this.ngbDateParserFormatter.parse(inputValue);
    if (parsedDate) {
      if (inputId === 'dpInicial') {
        this.modelInicial = parsedDate;
        this.fechaInicial = parsedDate;
      } else if (inputId === 'dpFinal') {
        this.modelFinal = parsedDate;
        this.fechaFinal = parsedDate;
      }
    }
  } 
  
  
}
