import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oversight-entry',
  templateUrl: './oversight-entry.component.html',
  styleUrls: ['./oversight-entry.component.scss']
})
export class OversightEntryComponent implements OnInit {

  oversight!: any;
  parameters!: any;

  formDate!: FormControl;
  formParameters!: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.http.get(
      'http://localhost:8000/api/oversight-entry/' + this.route.snapshot.params["oversightId"],
      { withCredentials: true }).subscribe((response: any) => {
        if(response.status == 0) {
          this.oversight = response.oversight;
          this.parameters = response.parameters;

          this.formDate = new FormControl('');
          this.formParameters = [];
          for(let i = 0; i < this.parameters.length; i++)
            this.formParameters[i] = new FormControl('');
        } else this.router.navigateByUrl("");
      });
  }

  submit(e: Event) {
    e.preventDefault();
    const params = [];
    for(let i = 0; i < this.parameters.length; i++)
      params[i] = { id: this.parameters[i].id, value: this.formParameters[i].value }

    const data = { date: this.formDate.value, parameters: params };
    const options = { withCredentials: true };
    this.http.post("http://localhost:8000/api/oversight-entry/add/" + this.oversight.id, data, options)
      .subscribe((response: any) => {
        if(response.status == 0) {
          console.log(response);
        } else if (response.status == -2) {
          this.router.navigateByUrl("sign-in");
        } else console.log(response);
      });
  }

}
