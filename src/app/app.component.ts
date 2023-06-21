import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'infodesign-full-stack-test';

  isLoading: boolean = true;

  simulateDataLoading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  ngOnInit() {
    this.simulateDataLoading();
  }
}
