import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { TableComponent } from './components/table/table.component';
import { ShowReportComponent } from './components/show-report/show-report.component';
import { HttpClientModule } from '@angular/common/http';
import { TranchesService } from './services/tranches.service';
import { ClientService } from './services/client.service';
import { Top20Service } from './services/top20.service';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent,
    TableComponent,
    ShowReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [TranchesService, ClientService, Top20Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
