import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as d3 from 'd3';
import { Client } from 'src/app/models/client.model';
import { Top20 } from 'src/app/models/top20.model';
import { Tranches } from 'src/app/models/tranches.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() tranchesData: Tranches[] = [];
  @Input() clientData: Client[] = [];
  @Input() top20Data: Top20[] = [];

  private svg: any;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  ngOnInit(): void {
    this.createSvg();
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['tranchesData'] ||
      changes['clientData'] ||
      changes['top20Data']
    ) {
      this.updateChart();
    }
  }

  private createSvg(): void {
    this.svg = d3
      .select('figure#bar')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private updateChart(): void {
    this.svg.selectAll('*').remove();

    if (this.tranchesData && this.tranchesData.length > 0) {
      this.drawBarsTranchesData(this.tranchesData);
    } else if (this.clientData && this.clientData.length > 0) {
      this.drawBarsClientData(this.clientData);
    } else if (this.top20Data && this.top20Data.length > 0) {
      this.drawBarsTop20Data(this.top20Data);
    } else {
      return;
    }
  }

  private drawBarsTranchesData(tranchesData: Tranches[]): void {
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(tranchesData.map((d) => d.Linea))
      .padding(0.2);

    const colorScale = d3
      .scaleOrdinal(d3.schemeCategory10)
      .domain(tranchesData.map((d) => d.Linea));

    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    const consumption = tranchesData.map((d) => d.Consumo) as number[];
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(consumption) || 0])
      .range([this.height, 0]);

    this.svg.append('g').call(d3.axisLeft(y));

    this.svg
      .selectAll('bars')
      .data(tranchesData)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.Linea))
      .attr('y', (d: any) => y(d.Consumo))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.Consumo))
      .attr('fill', (d: any) => colorScale(d.Linea));
  }

  private drawBarsClientData(clientData: Client[]): void {
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(clientData.map((d) => d.Linea))
      .padding(0.2);

    const colorScale = d3
      .scaleOrdinal(d3.schemeCategory10)
      .domain(clientData.map((d) => d.Linea));

    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    const consumption = clientData.map((d) => d.Consumo) as number[];
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(consumption) || 0])
      .range([this.height, 0]);

    this.svg.append('g').call(d3.axisLeft(y));

    this.svg
      .selectAll('bars')
      .data(clientData)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.Linea))
      .attr('y', (d: any) => y(d.Consumo))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.Consumo))
      .attr('fill', (d: any) => colorScale(d.Linea));
  }

  private drawBarsTop20Data(top20Data: Top20[]): void {
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(top20Data.map((d) => d.Linea))
      .padding(0.2);

    const colorScale = d3
      .scaleOrdinal(d3.schemeCategory10)
      .domain(top20Data.map((d) => d.Linea));

    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    const consumption = top20Data.map((d) => d.Perdida) as number[];
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(consumption) || 0])
      .range([this.height, 0]);

    this.svg.append('g').call(d3.axisLeft(y));

    this.svg
      .selectAll('bars')
      .data(top20Data)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.Linea))
      .attr('y', (d: any) => y(d.Perdida))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.Perdida))
      .attr('fill', (d: any) => colorScale(d.Linea));
  }
}
