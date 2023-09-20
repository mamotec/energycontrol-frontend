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
      .attr('height', '70vh') // Höhe auf 100% der übergeordneten Komponente setzen
      .attr('preserveAspectRatio', 'xMidYMid meet'); // xMidYMid bewirkt, dass das SVG zentriert bleibt

    // Plant
    d3.xml('assets/svg/plant.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

      // Positioniere das importierte SVG-Element an den gewünschten Koordinaten (z.B., x=100, y=100)
      importedSVG
        .attr('x', 570)
        .attr('y', 290)
        .attr('width', 150)
        .attr('height', 150);

      this.svg.node().appendChild(importedNode);
    })

    // Pumpe
    d3.xml('assets/svg/pump.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

      importedSVG
        .attr('x', 1010)
        .attr('y', 100)
        .attr('width', 70)
        .attr('height', 70);

      this.svg.node().appendChild(importedNode);
      this.svg.append('text')
        .attr('x', 1020)
        .attr('y', 205)
        .text('Wärmepumpe')
        .style('font-size', '15px')
        .style('fill', '#9c9898');
    })

    // Pumpe
    d3.xml('assets/svg/home.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

      importedSVG
        .attr('x', 1010)
        .attr('y', 350)
        .attr('width', 70)
        .attr('height', 70);

      this.svg.node().appendChild(importedNode);

      this.svg.append('text')
        .attr('x', 1020)
        .attr('y', 455)
        .text('Haushaltsverbrauch')
        .style('font-size', '15px')
        .style('fill', '#9c9898');
    })

    // Auto
    d3.xml('assets/svg/pump.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

      importedSVG
        .attr('x', 1010)
        .attr('y', 500)
        .attr('width', 70)
        .attr('height', 70);

      this.svg.node().appendChild(importedNode);

      this.svg.append('text')
        .attr('x', 1020)
        .attr('y', 605)
        .text('E-Auto')
        .style('font-size', '15px')
        .style('fill', '#9c9898');
    })

    // Batterie
    d3.xml('assets/svg/battery.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

      importedSVG
        .attr('x', 500)
        .attr('y', 580)
        .attr('width', 70)
        .attr('height', 70);

      this.svg.node().appendChild(importedNode);

      this.svg.append('text')
        .attr('x', 505)
        .attr('y', 660)
        .text('Batterie')
        .style('font-size', '15px')
        .style('fill', '#9c9898');
    })

    this.svg
      .append('line')
      .attr('x1', 630)
      .attr('y1', 265)
      .attr('x2', 630)
      .attr('y2', 150)
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)

    this.svg
      .append('line')
      .attr('x1', 630)
      .attr('y1', 450)
      .attr('x2', 630)
      .attr('y2', 565)
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)


    // Haushalt
    this.svg
      .append('line')
      .attr('x1', 750)
      .attr('y1', 370)
      .attr('x2', 950)
      .attr('y2', 370)
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)

    // Wärmepumpe
    this.svg
      .append('line')
      .attr('x1', 950)
      .attr('x2', 950)
      .attr('y1', 370)
      .attr('y2', 200)
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)

    this.svg
      .append('line')
      .attr('x1', 950)
      .attr('x2', 1000)
      .attr('y1', 200)
      .attr('y2', 200)
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)


    // Haushaltverbrauch & E-Auto
    this.svg
      .append('line')
      .attr('x1', 950)
      .attr('x2', 950)
      .attr('y1', 370)
      .attr('y2', 600)
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)

    // Verbrauch
    this.svg
      .append('line')
      .attr('x1', 950)
      .attr('x2', 1000)
      .attr('y1', 450)
      .attr('y2', 450)
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)

    // E-Auto
    this.svg
      .append('line')
      .attr('x1', 950)
      .attr('x2', 1000)
      .attr('y1', 600)
      .attr('y2', 600)
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)


    let circleGrid = this.svg
      .append('circle')
      .attr('cx', 630)
      .attr('cy', 265)
      .attr('r', 7)
      .attr('fill', 'yellow');

    let circleBattery = this.svg
      .append('circle')
      .attr('cx', 630)
      .attr('cy', 450)
      .attr('r', 7)
      .attr('fill', 'yellow');

    let circleHaushalt = this.svg
      .append('circle')
      .attr('cx', 750)
      .attr('cy', 370)
      .attr('r', 7)
      .attr('fill', 'red');



    this.animateCircleY(circleGrid, 265, 150);
    this.animateCircleY(circleBattery, 450, 565);
    this.animateCircleX(circleHaushalt, 750, 950);

    // Animation
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
