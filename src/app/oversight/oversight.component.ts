import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(
      "http://localhost:8000/api/oversight/" + this.route.snapshot.params["id"], 
      { withCredentials: true }
    ).subscribe(
      (response: any) => {
        if(response.status == 0) {
          this.oversight = response.oversight;
          this.entryDetails = response.entryDetails;
          this.parameters = response.parameters;
          this.chartDatas = response.chartDatas;
          console.log(this.chartDatas);
        } else if(response.status == -2)
          this.router.navigateByUrl("sign-in");
        else this.router.navigateByUrl("");
      }
    );
  }

}
