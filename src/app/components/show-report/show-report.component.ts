import { Component } from '@angular/core';

@Component({
  selector: 'app-show-report',
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.css']
})
export class ShowReportComponent {
  public isCollapsed: Record<number, boolean> = {
    1: true,
    2: true,
    3: true
  };

  toggleCollapse(id: number) {
    this.isCollapsed[id] = !this.isCollapsed[id];
  }
}

