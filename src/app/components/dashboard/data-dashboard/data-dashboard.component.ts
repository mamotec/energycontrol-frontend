import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-data-dashboard',
  templateUrl: './data-dashboard.component.html',
  styleUrls: ['./data-dashboard.component.scss']
})
export class DataDashboardComponent implements AfterViewInit {
  @ViewChild('chart') private chartContainer!: ElementRef;
  private svg: any;

  strokeWidth = 3;
  duration = 3500;
  strokeFill = '#d8d8d8';

  private createChart(): void {
    const element = this.chartContainer.nativeElement;
    this.svg = d3.select(element).append('svg')
      .attr('width', '70vw') // Breite auf 100% der übergeordneten Komponente setzen
      .attr('height', '70vh')
      .attr('preserveAspectRatio', 'xMidYMid meet'); // xMidYMid bewirkt, dass das SVG zentriert bleibt

    // Plant
    d3.xml('assets/svg/grid.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

      // Positioniere das importierte SVG-Element an den gewünschten Koordinaten (z.B., x=100, y=100)
      importedSVG
        .attr('x', '14vw')
        .attr('y', '3vh')
        .attr('width', '6vw')
        .attr('height', '6vh');

      this.svg.append('text')
        .attr('x', '15.5vw')
        .attr('y', '12vh')
        .text('Netzeinspeisung')
        .style('font-size', '1vw')
        .style('fill', '#9c9898');

      this.svg.node().appendChild(importedNode);
    })
    d3.xml('assets/svg/plant.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

      // Positioniere das importierte SVG-Element an den gewünschten Koordinaten (z.B., x=100, y=100)
      importedSVG
        .attr('x', '15.5vw')
        .attr('y', '28vh')
        .attr('width', '10vw')
        .attr('height', '10vh');

      this.svg.node().appendChild(importedNode);

      this.svg.append('text')
        .attr('x', '12vw')
        .attr('y', '30vh')
        .text('PV')
        .style('font-size', '1vw')
        .style('fill', '#9c9898');

      this.svg.append('text')
        .attr('x', '6vw')
        .attr('y', '30vh')
        .text('7 kWp')
        .style('font-size', '1vw')
        .style('fill', '#555956');

      this.svg.append('text')
        .attr('x', '6vw')
        .attr('y', '34vh')
        .text('5,51 kW')
        .style('font-size', '2vw')
        .style('fill', '#53c271');
    })


    // Pumpe
    d3.xml('assets/svg/pump.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

      importedSVG
        .attr('x', '45vw')
        .attr('y', '8vh')
        .attr('width', '6vw')
        .attr('height', '6vh');

      this.svg.node().appendChild(importedNode);
      this.svg.append('text')
        .attr('x', '46.5vw')
        .attr('y', '16.5vh')
        .text('Wärmepumpe')
        .style('font-size', '1vw')
        .style('fill', '#9c9898');
    })

    // Pumpe
    d3.xml('assets/svg/home.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

      importedSVG
        .attr('x', '45vw')
        .attr('y', '30vh')
        .attr('width', '6vw')
        .attr('height', '6vh');

      this.svg.node().appendChild(importedNode);

      this.svg.append('text')
        .attr('x', '46.5vw')
        .attr('y', '38.5vh')
        .text('Haushaltsverbrauch')
        .style('font-size', '1vw')
        .style('fill', '#9c9898');
    })

    // Auto
    d3.xml('assets/svg/car.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

      importedSVG
        .attr('x', '45vw')
        .attr('y', '50vh')
        .attr('width', '6vw')
        .attr('height', '6vh');

      this.svg.node().appendChild(importedNode);

      this.svg.append('text')
        .attr('x', '46.5vw')
        .attr('y', '58.5vh')
        .text('E-Auto')
        .style('font-size', '1vw')
        .style('fill', '#9c9898');
    })

    // Batterie
    d3.xml('assets/svg/battery.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

      importedSVG
        .attr('x', '13.5vw')
        .attr('y', '55vh')
        .attr('width', '3.5vw')
        .attr('height', '3.5vh');

      this.svg.node().appendChild(importedNode);

      this.svg.append('text')
        .attr('x', '13.3vw')
        .attr('y', '60vh')
        .text('Batterie')
        .style('font-size', '1vw')
        .style('fill', '#9c9898');
    })

    this.svg
      .append('line')
      .attr('x1', '20vw')
      .attr('y1', '14vh')
      .attr('x2', '20vw')
      .attr('y2', '24vh')
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)

    this.svg
      .append('line')
      .attr('x1', '20vw')
      .attr('y1', '42vh')
      .attr('x2', '20vw')
      .attr('y2', '52vh')
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)


    // Haushalt
    this.svg
      .append('line')
      .attr('x1', '27vw')
      .attr('y1', '32vh')
      .attr('x2', '43vw')
      .attr('y2', '32vh')
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)

    // Wärmepumpe
    this.svg
      .append('line')
      .attr('x1', '43vw')
      .attr('y1', '39vh')
      .attr('x2', '43vw')
      .attr('y2', '16vh')
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)

    this.svg
      .append('line')
      .attr('x1', '43vw')
      .attr('y1', '16vh')
      .attr('x2', '46vw')
      .attr('y2', '16vh')
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)


    // Haushaltverbrauch & E-Auto
    this.svg
      .append('line')
      .attr('x1', '43vw')
      .attr('y1', '32vh')
      .attr('x2', '43vw')
      .attr('y2', '58vh')
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)

    // Verbrauch
    this.svg
      .append('line')
      .attr('x1', '43vw')
      .attr('y1', '38vh')
      .attr('x2', '46vw')
      .attr('y2', '38vh')
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)

    // E-Auto
    this.svg
      .append('line')
      .attr('x1', '43vw')
      .attr('y1', '58vh')
      .attr('x2', '46vw')
      .attr('y2', '58vh')
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)


    let circleGrid = this.svg
      .append('circle')
      .attr('cx', '20vw')
      .attr('cy', '24vh')
      .attr('r', 7)
      .attr('fill', 'yellow');

    let circleBattery = this.svg
      .append('circle')
      .attr('cx', '20vw')
      .attr('cy', '42vh')
      .attr('r', 7)
      .attr('fill', 'yellow');

    let circleHaushalt = this.svg
      .append('circle')
      .attr('cx', '27vw')
      .attr('cy', '32vh')
      .attr('r', 7)
      .attr('fill', 'red');

    // Animation
    this.animateCircleY(circleGrid, '24vh', '14vh');
    this.animateCircleY(circleBattery, '42vh', '52vh');
    this.animateCircleX(circleHaushalt, '27vw', '43vw');

  }

  private animateCircleY(circle: any, start: any, end: any): void {

    circle
      .transition()
      .duration(this.duration)
      .attr('cy', end)
      .on('end', () => {
        circle
          .style('opacity', 0)
          .transition()
          .duration(0)
          .attr('cy', start)
          .style('opacity', 1)
          .on('end', () => {
            this.animateCircleY(circle, start, end);
          });
      });
  }

  private animateCircleX(circle: any, start: any, end: any): void {

    circle
      .transition()
      .duration(this.duration)
      .attr('cx', end)
      .on('end', () => {
        circle
          .style('opacity', 0)
          .transition()
          .duration(0)
          .attr('cx', start)
          .style('opacity', 1)
          .on('end', () => {
            this.animateCircleX(circle, start, end);
          });
      });
  }

  ngAfterViewInit(): void {
    this.createChart();
  }
}
