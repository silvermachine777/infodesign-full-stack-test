import { Component } from '@angular/core';
import {
  NgbDateStruct,
  NgbDateParserFormatter,
  NgbDate,
} from '@ng-bootstrap/ng-bootstrap';

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

  errorFecha: string | null = null;

  constructor(private ngbDateParserFormatter: NgbDateParserFormatter) {}

  validateDateSelection(): boolean {
    if (this.fechaInicial && this.fechaFinal) {
      const fechaInicial = NgbDate.from(this.fechaInicial);
      const fechaFinal = NgbDate.from(this.fechaFinal);
      if (fechaInicial && fechaFinal) {
        return (
          fechaInicial.before(fechaFinal) || fechaInicial.equals(fechaFinal)
        );
      }
    }
    return true;
  }

  validateAndSetError() {
    if (!this.validateDateSelection()) {
      this.errorFecha =
        'La fecha de inicio no puede ser superior a la fecha final, selecciona una fecha inicial correcta.';

      setTimeout(() => {
        this.errorFecha = null;
      }, 3000);
    } else {
      this.errorFecha = null;
    }
  }

  onDateSelect(date: NgbDateStruct, inputId: string) {
    if (inputId === 'dpInicial') {
      this.modelInicial = date;
      this.fechaInicial = this.ngbDateParserFormatter.parse(
        this.ngbDateParserFormatter.format(date)
      )!;
    } else if (inputId === 'dpFinal') {
      this.modelFinal = date;
      this.fechaFinal = this.ngbDateParserFormatter.parse(
        this.ngbDateParserFormatter.format(date)
      )!;
    }

    this.validateAndSetError();
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

      this.validateAndSetError();
    }
  }
}
