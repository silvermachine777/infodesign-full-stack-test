import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranchesService } from './../../services/tranches.service';
import { HttpHeaders } from '@angular/common/http';
import { ClientService } from 'src/app/services/client.service';
import { Top20Service } from 'src/app/services/top20.service';
import { Tranches } from 'src/app/models/tranches.model';
import { Client } from 'src/app/models/client.model';
import { Top20 } from 'src/app/models/top20.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-show-report',
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.css'],
})
export class ShowReportComponent {
  @Input() fechaInicial!: NgbDateStruct;
  @Input() fechaFinal!: NgbDateStruct;
  @Input() data!: (Tranches | Client | Top20)[];

  tranchesData: Tranches[] = [];
  clientData: Client[] = [];
  top20Data: Top20[] = [];

  datesSelected = true;

  public isCollapsed: Record<number, boolean> = {
    1: true,
    2: true,
    3: true,
  };

  constructor(
    private tranchesService: TranchesService,
    private clientService: ClientService,
    private top20Service: Top20Service
  ) {}

  toggleCollapse(id: number) {
    this.isCollapsed[id] = !this.isCollapsed[id];
  }

  getHistoricConsumptionByTranches() {
    if (!this.fechaInicial || !this.fechaFinal) {
      this.datesSelected = false;
      return;
    }

    const requestBody = {
      initialDate: this.formatDate(this.fechaInicial),
      finalDate: this.formatDate(this.fechaFinal),
      historyType: 'historyByTranches',
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.tranchesService.getTranches(requestBody, headers)
    .pipe(
      catchError((error) => {
        console.log('Error al llamar a la API:', error);
        return of({ data: [] }); 
      })
    )
    .subscribe(
      (response) => {
        this.tranchesData = response.data;
        this.data = this.tranchesData;
      }
    );
    this.datesSelected = true;
  }

  getHistoricConsumptionByClient() {
    if (!this.fechaInicial || !this.fechaFinal) {
      this.datesSelected = false;
      return;
    }

    const requestBody = {
      initialDate: this.formatDate(this.fechaInicial),
      finalDate: this.formatDate(this.fechaFinal),
      historyType: 'historyByClient',
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.clientService.getClients(requestBody, headers)
    .pipe(
      catchError((error) => {
        console.log('Error al llamar a la API:', error);
        return of({ data: [] });
      })
    )
    .subscribe(
      (response) => {
        this.clientData = response.data;
        this.data = this.clientData;
      }
    );

    this.datesSelected = true;
  }

  getTop20() {
    if (!this.fechaInicial || !this.fechaFinal) {
      this.datesSelected = false;
      return;
    }
    
    const requestBody = {
      initialDate: this.formatDate(this.fechaInicial),
      finalDate: this.formatDate(this.fechaFinal),
      historyType: 'top20',
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.top20Service.getTop20(requestBody, headers)
    .pipe(
      catchError((error) => {
        console.log('Error al llamar a la API:', error);
        return of({ data: [] });
      })
    )
    .subscribe(
      (response) => {
        this.top20Data = response.data;
        this.data = this.top20Data;
      }
    );
    this.datesSelected = true;
  }

  private formatDate(date: NgbDateStruct): string {
    const year = date.year.toString().padStart(4, '0');
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
