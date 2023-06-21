import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Top20 } from 'src/app/models/top20.model';
import { Tranches } from 'src/app/models/tranches.model';
import { DecimalPipe } from '@angular/common';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnChanges {
  @Input() data!: (Tranches | Client | Top20)[];
  
  page = 1;
  pageSize = 10;
  collectionSize: number = 0;
  paginatedData: (Tranches | Client | Top20)[] = [];

  constructor(private decimalPipe: DecimalPipe, private config: NgbPaginationConfig) {
    config.boundaryLinks = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && !changes['data'].firstChange) {
      this.refreshData();
    }
  }

  getColumns(): string[] {
    if (this.paginatedData && this.paginatedData.length > 0) {
      return Object.keys(this.paginatedData[0]);
    }
    return [];
  }

  getPropertyValue(item: Tranches | Client | Top20, column: string): any {
    return (item as any)[column];
  }

  onPageChange(page: number) {
    this.page = page;
    this.refreshData();
  }

  refreshData() {
    if (this.data) {
      const startIndex = (this.page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.collectionSize = this.data.length;
      this.paginatedData = this.data.slice(startIndex, endIndex);
    }
  }  
}
