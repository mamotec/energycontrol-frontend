import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

export interface CreateInterfaceRequest {
  deviceClass: string
}

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  private RESOURCE = "device/"

  constructor(private backend: ApiService, ) {
  }

  createInterface(deviceClass: string): void {
    let createInterfaceRequest: CreateInterfaceRequest = {
      deviceClass: deviceClass,
    }

    this.backend.post<CreateInterfaceRequest>(this.RESOURCE + "interface", createInterfaceRequest).subscribe(response => {
      console.log(response)
    });
  }

}
