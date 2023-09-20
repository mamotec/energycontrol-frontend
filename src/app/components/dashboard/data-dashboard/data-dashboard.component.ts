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
  private circle: any;

  constructor() {

  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement;
    this.svg = d3.select(element).append('svg');

    // Beispiel für einen Pfeil, der den Stromfluss darstellt
    this.svg
      .append('line')
      .attr('x1', 50)
      .attr('y1', 50)
      .attr('x2', 200)
      .attr('y2', 50)
      .attr('stroke', '#d8d8d8')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrow)');

    this.circle = this.svg
      .append('circle')
      .attr('cx', 50)
      .attr('cy', 50)
      .attr('r', 5)
      .attr('fill', 'yellow');

    // Animation
    this.animateCircle();
  }

  private animateCircle(): void {
    const duration = 3500; // Dauer der Hin- und Herbewegung (2 Sekunden)
    const startX = 50;
    const endX = 200;

    this.circle
      .transition()
      .duration(duration)
      .attr('cx', endX)
      .on('end', () => {
        // Nachdem die Animation abgeschlossen ist, den Kreis ausblenden
        this.circle
          .style('opacity', 0)
          .transition()
          .duration(0) // Keine Dauer, da wir sofort zurückbewegen wollen
          .attr('cx', startX)
          .style('opacity', 1) // Kreis wieder einblenden
          .on('end', () => {
            // Die Animation erneut starten, um den Zyklus zu wiederholen
            this.animateCircle();
          });
      });
  }

  ngAfterViewInit(): void {
    this.createChart();
  }
}
