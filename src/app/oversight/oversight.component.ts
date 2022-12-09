import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-oversight',
  templateUrl: './oversight.component.html',
  styleUrls: ['./oversight.component.scss']
})
export class OversightComponent implements OnInit {

  oversight!: any;
  entryDetails!: any;
  parameters!: any;
  chartDatas!: any;

  isConnected!: boolean;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private http: HttpClient) {}

  ngOnInit(): void {
    this.isConnected = false;
    this.http.get(environment.url + "/api/oversight/" + this.route.snapshot.params["id"], { withCredentials: true })
      .subscribe((response: any) => {
        if(response.status == 0) {
          this.isConnected = true;
          this.oversight = response.oversight;
          this.entryDetails = response.entryDetails;
          this.parameters = response.parameters;
          this.chartDatas = response.chartDatas;
        } else if(response.status == -1)
          this.router.navigateByUrl("sign-in");
        else console.log(response);
      });
  }

}
