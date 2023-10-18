import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as moment from 'moment-timezone';
import {Device} from "../../../../api";

@Component({
    selector: 'app-dashboard-top-bar',
    templateUrl: './dashboard-top-bar.component.html',
    styleUrls: ['./dashboard-top-bar.component.scss']
})
export class DashboardTopBarComponent implements OnInit {
    sunData: any;
    sunrise!: string;
    sunset!: string;
    currentTime!: string;
    loading: boolean = true;

    constructor(private http: HttpClient) {
    }


    ngOnInit(): void {
        this.getLocation()
        this.updateTime()
    }

    updateTime() {
        const now = new Date();
        this.currentTime = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        setTimeout(() => this.updateTime(), 30000);
    }

    getLocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                this.getSunData(latitude, longitude);
            });
        } else {
            console.log("Geolocation wird von diesem Browser nicht unterstützt.");
        }
    }

    getSunData(lat: number, lng: number): void {
        const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`;
        this.http.get(url).subscribe(data => {
            this.sunData = data;
            this.sunrise = this.convertToBerlinTime(this.sunData.results.sunrise);
            this.sunset = this.convertToBerlinTime(this.sunData.results.sunset);
            this.loading = false;
        });
    }

    convertToBerlinTime(utcTime: string): string {
        const date = moment.utc(`1970-01-01 ${utcTime} AM`, 'YYYY-MM-DD hh:mm A');
        const berlinTime = date.add(2, 'hours'); // MESZ entspricht UTC+2
        return berlinTime.format('HH:mm');
    }

    protected readonly Device = Device;
}
