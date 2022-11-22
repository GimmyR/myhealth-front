import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-oversight-entry',
  templateUrl: './oversight-entry.component.html',
  styleUrls: ['./oversight-entry.component.scss']
})
export class OversightEntryComponent implements OnInit {

  oversight!: any;
  parameters!: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.http.get(
      'http://localhost:8000/api/oversight-entry/' + this.route.snapshot.params["oversightId"],
      { withCredentials: true }).subscribe((response: any) => {
        this.oversight = response.oversight;
        this.parameters = response.parameters;
      });
  }

}
