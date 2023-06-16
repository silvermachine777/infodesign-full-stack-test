import { Component, Input } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Top20 } from 'src/app/models/top20.model';
import { Tranches } from 'src/app/models/tranches.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() data!: (Tranches | Client | Top20)[];

  getColumns(): string[] {
    if (this.data.length > 0) {
      return Object.keys(this.data[0]);
    }
    return [];
  }

  getPropertyValue(item: Tranches | Client | Top20, column: string): any {
    return (item as any)[column];
  }
}
