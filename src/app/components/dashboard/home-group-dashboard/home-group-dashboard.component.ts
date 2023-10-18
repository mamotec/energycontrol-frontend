import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import * as d3 from "d3";
import {DeviceGroupControllerService, HomeDataRepresentation} from "../../../api";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-home-group-dashboard',
  templateUrl: './home-group-dashboard.component.html',
  styleUrls: ['./home-group-dashboard.component.scss']
})
export class HomeGroupDashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chart') private chartContainer!: ElementRef;
  private svg: any;
  homeData: HomeDataRepresentation | undefined;

  strokeWidth = 3;
  duration = 4200;
  strokeFill = '#a8a7a7';

  arrowDownGrid: any;

  intervalId: any;

  constructor(private deviceGroupService: DeviceGroupControllerService) {
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  ngAfterViewInit(): void {
    this.createChart();

    this.intervalId = setInterval(async () => {
      await this.loadData();
      this.updateSvgs()
    }, 3500);
  }

  async loadData() {
    await firstValueFrom(this.deviceGroupService.fetchHomeDashboard())
      .then((data) => {
        this.homeData = data;
      });
  }

  private async createChart() {
    const element = this.chartContainer.nativeElement;
    this.svg = d3.select(element).append('svg')
      .attr('width', '70vw')
      .attr('height', '70vh')
      .attr('preserveAspectRatio', 'xMidYMid meet');


    await this.loadData()

    this.createGrid();
    this.createPlant()
    this.createBattery()
    this.createPump()
    this.createHousehold()
    this.createChargingStation()

    this.updateSvgs()

  }

  updateSvg(id: any, value: any, unit: any, color?: any) {
    if (value > 0 && color) {
      this.svg.select('#' + id)
        .text(value + unit)
        .style('fill', color);
    } else {
      this.svg.select('#' + id)
        .text(value + unit)
    }
  }

  updateSvgVisibility(id: any, value: any) {
    this.svg.select('#' + id)
      .attr('visibility', value ? 'visible' : 'hidden')
  }

  updateSvgFill(id: any, value: any) {
    this.svg.select('#' + id)
      .style('fill', value)
  }

  createPlant() {
    d3.xml('assets/svg/plant.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

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
        .style('font-size', 'calc(0.75vw + 0.75vh)')
        .style('fill', '#9c9898');

      this.svg.append('text')
        .attr('x', '6vw')
        .attr('y', '30vh')
        .text(this.homeData?.peakKilowatt + ' kWp')
        .style('font-size', 'calc(0.75vw + 0.75vh)')
        .style('fill', '#555956');

      this.svg.append('text')
        .attr('x', '6vw')
        .attr('y', '35vh')
        .attr('id', 'activePower')
        .text(this.homeData?.activePower + ' W')
        .style('font-size', 'calc(1.1vw + 1.1vh)')
        .style('fill', '#53c271');

    })
  }

  createBattery() {
    this.svg
      .append('line')
      .attr('x1', '20vw')
      .attr('y1', '42vh')
      .attr('x2', '20vw')
      .attr('y2', '52vh')
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)

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
        .style('font-size', 'calc(0.75vw + 0.75vh)')
        .style('fill', '#9c9898');

      this.svg.append('text')
        .attr('x', '23vw')
        .attr('y', '60vh')
        .attr('id', 'batterySoc')
        .text(this.homeData?.batterySoc + ' %')
        .style('font-size', 'calc(0.75vw + 0.75vh)')
        .style('fill', this.getBatteryColor());

      this.svg.append('text')
        .attr('x', '23vw')
        .attr('y', '57vh')
        .attr('id', 'batteryPower')
        .text(this.homeData?.batteryPower.value + ' W')
        .style('font-size', 'calc(0.75vw + 0.75vh)')
        .style('fill', '#9c9898');
    })
    d3.xml('assets/svg/arrowhead-down.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

      importedSVG
        .attr('x', '18.25vw')
        .attr('y', '50vh')
        .attr('id', 'arrowDownBattery')
        .attr('visibility', this.homeData?.batteryPower.value == 0 ? 'hidden' : this.homeData?.batteryPower.consumption ? 'visible' : 'hidden')
        .attr('width', '3.5vw')
        .attr('height', '3.5vh');

      this.svg.node().appendChild(importedNode);
    })
    d3.xml('assets/svg/arrowhead-up.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

      importedSVG
        .attr('x', '18.25vw')
        .attr('y', '40vh')
        .attr('id', 'arrowUpBattery')
        .attr('visibility', this.homeData?.batteryPower.value == 0 ? 'hidden' : this.homeData?.batteryPower.consumption ? 'hidden' : 'visible')
        .attr('width', '3.5vw')
        .attr('height', '3.5vh');

      this.svg.node().appendChild(importedNode);
    })
  }


  createPump() {
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
        .style('font-size', 'calc(0.75vw + 0.75vh)')
        .style('fill', '#9c9898');

      this.svg.append('text')
        .attr('x', '54.5vw')
        .attr('y', '11.5vh')
        .attr('id', 'heatPump')
        .text(this.homeData?.heatPumpActive ? 'Ein' : 'Aus')
        .style('font-size', 'calc(1.1vw + 1.1vh)')
        .style('fill', '#9c9898');
    })
  }

  createHousehold() {
    // Haushalt
    this.svg
      .append('line')
      .attr('x1', '27vw')
      .attr('y1', '32vh')
      .attr('x2', '43vw')
      .attr('y2', '32vh')
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

    // Haushalt
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
        .style('font-size', 'calc(0.75vw + 0.75vh)')
        .style('fill', '#9c9898');

      this.svg.append('text')
        .attr('x', '54.5vw')
        .attr('y', '33.5vh')
        .attr('id', 'houseHoldPower')
        .text(this.homeData?.houseHoldPower + ' W')
        .style('font-size', 'calc(1.1vw + 1.1vh)')
        .style('fill', '#9c9898');
    })
  }

  createChargingStation() {
    // Haushaltverbrauch & E-Auto
    this.svg
      .append('line')
      .attr('x1', '43vw')
      .attr('y1', '32vh')
      .attr('x2', '43vw')
      .attr('y2', '58vh')
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
        .text('Ladestation')
        .style('font-size', 'calc(0.75vw + 0.75vh)')
        .style('fill', '#9c9898');

      this.svg.append('text')
        .attr('x', '54.5vw')
        .attr('y', '54vh')
        .attr('id', 'chargingStationPower')
        .text(this.homeData?.chargingStation.value + ' W')
        .style('font-size', 'calc(1.1vw + 1.1vh)')
        .style('fill', '#9c9898');
    })
  }

  createGrid() {
    this.svg
      .append('line')
      .attr('x1', '20vw')
      .attr('y1', '14vh')
      .attr('x2', '20vw')
      .attr('y2', '24vh')
      .attr('stroke', this.strokeFill)
      .attr('stroke-width', this.strokeWidth)

    d3.xml('assets/svg/grid.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

      importedSVG
        .attr('x', '14vw')
        .attr('y', '3vh')
        .attr('width', '6vw')
        .attr('height', '6vh');

      this.svg.append('text')
        .attr('x', '15.5vw')
        .attr('y', '12vh')
        .text('Netzeinspeisung')
        .style('font-size', 'calc(0.75vw + 0.75vh)')
        .style('fill', '#9c9898');

      this.svg.append('text')
        .attr('x', '21.5vw')
        .attr('y', '7vh')
        .attr('id', 'gridPower')
        .text(this.homeData?.grid.value + ' W')
        .style('font-size', 'calc(1.1vw + 1.1vh)')
        .style('fill', '#9c9898');

      this.svg.node().appendChild(importedNode);
    })
    d3.xml('assets/svg/arrowhead-down.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

      importedSVG
        .attr('x', '18.25vw')
        .attr('y', '22vh')
        .attr('id', 'arrowDownGrid')
        .attr('visibility', this.homeData?.grid.value == 0 ? 'hidden' : this.homeData?.grid.consumption ? 'hidden' : 'visible')
        .attr('width', '3.5vw')
        .attr('height', '3.5vh');

      this.svg.node().appendChild(importedNode);
    })
    d3.xml('assets/svg/arrowhead-up.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      const importedSVG = d3.select(importedNode);

      importedSVG
        .attr('x', '18.25vw')
        .attr('y', '12vh')
        .attr('id', 'arrowUpGrid')
        .attr('visibility', this.homeData?.grid.value == 0 ? 'hidden' : this.homeData?.grid.consumption ? 'visible' : 'hidden')
        .attr('width', '3.5vw')
        .attr('height', '3.5vh');

      this.svg.node().appendChild(importedNode);
    })
  }

  updateSvgs() {
    this.updateSvg('gridPower', this.homeData?.grid.value, ' W')
    this.updateSvg('activePower', this.homeData?.activePower, ' W')
    this.updateSvg('batteryPower', this.homeData?.batteryPower.value, ' W')
    this.updateSvg('batterySoc', this.homeData?.batterySoc, ' %')
    this.updateSvg('heatPump', this.homeData?.heatPumpActive ? 'Ein' : 'Aus', '')
    this.updateSvg('houseHoldPower', this.homeData?.houseHoldPower, ' W')
    this.updateSvg('chargingStationPower', this.homeData?.chargingStation.value, ' W')
    this.updateSvgFill('batterySoc', this.getBatteryColor())
    this.updateSvgVisibility('arrowDownGrid', this.homeData?.grid.value != 0 && !this.homeData?.grid.consumption)
    this.updateSvgVisibility('arrowUpGrid', this.homeData?.grid.value != 0 && this.homeData?.grid.consumption)
    this.updateSvgVisibility('arrowDownBattery', this.homeData?.batteryPower.value != 0 && this.homeData?.batteryPower.consumption)
    this.updateSvgVisibility('arrowUpBattery', this.homeData?.batteryPower.value != 0 && !this.homeData?.batteryPower.consumption)
  }

  private getBatteryColor() {
    if (this.homeData == undefined) {
      return this.strokeFill;
    }
    if (this.homeData?.batterySoc < 30) {
      return '#b03434';
    } else if (this.homeData?.batterySoc < 70) {
      return '#dada29';
    } else {
      return '#53c271';
    }
  }
}
