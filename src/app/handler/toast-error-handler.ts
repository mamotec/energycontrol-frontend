import {ErrorHandler, Injectable} from "@angular/core";
import {MessageService} from "primeng/api";

@Injectable()
export class ToastErrorHandler implements ErrorHandler {

  constructor(private messageService: MessageService) {
  }

  handleError(error: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Fehler',
      detail: error.message || 'Bruder mach groß'
    })
  }
}
