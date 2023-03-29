import { Component } from '@angular/core';
import { RequestServiceService } from '../request-service.service';

@Component({
  selector: 'app-peding-request',
  templateUrl: './peding-request.component.html',
  styleUrls: ['./peding-request.component.css']
})
export class PedingRequestComponent {
   requests: Request[] | undefined;

  constructor(private requestService: RequestServiceService) { }

  ngOnInit(): void {
    this.getPendingRequests();
  }

  getPendingRequests(): void {
    this.requestService.getPendingRequests()
      .subscribe((requests: Request[] | undefined) => this.requests = requests);
  }

  approveRequest(requestId: number): void {
    this.requestService.approveRequest(requestId)
      .subscribe(() => this.getPendingRequests());
  }

  rejectRequest(requestId: number): void {
    this.requestService.rejectRequest(requestId)
      .subscribe(() => this.getPendingRequests());
  }



}
