import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oversight-entry-edit',
  templateUrl: './oversight-entry-edit.component.html',
  styleUrls: ['./oversight-entry-edit.component.scss']
})
export class OversightEntryEditComponent implements OnInit {

  oversight!: any;
  parameters!: any;
  entry!: any;
  details!: any;

  formDate!: FormControl;
  formParameters!: any;

  isConnected!: boolean;
  isLoading!: boolean;
  alert!: any;

  constructor(private http: HttpClient, 
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isConnected = false;
    this.isLoading = false;
    this.alert = { error: false, display: false, message: null };
    this.http.get(
      'http://localhost:8000/api/oversight-entry/edit/' + this.route.snapshot.params["id"],
      { withCredentials: true }).subscribe((response: any) => {
        if(response.status == 0) {
          this.isConnected = true;
          this.oversight = response.oversight;
          this.parameters = response.parameters;
          this.entry = response.entry;
          this.details = response.details;

          this.formDate = new FormControl('');
          this.formParameters = [];
          for(let i = 0; i < this.parameters.length; i++)
            this.formParameters[i] = new FormControl('');
        } else this.router.navigateByUrl("");
      });
  }

  submit(e: Event) {
    e.preventDefault();
    this.isLoading = true;
    const params = [];
    for(let i = 0; i < this.parameters.length; i++)
      params[i] = { id: this.parameters[i].id, value: this.formParameters[i].value }

    const data = { date: this.formDate.value, parameters: params };
    const options = { withCredentials: true };
    this.http.post("http://localhost:8000/api/oversight-entry/edit/" + this.entry.id, data, options)
      .subscribe((response: any) => {
        this.isLoading = false;
        if(response.status == 0) {
          this.alert.display = true;
          this.alert.message = "Mise à jour de donnée réussie !";
        } else if (response.status == -2) {
          this.router.navigateByUrl("sign-in");
        } else {
          this.alert.error = true;
          this.alert.display = true;
          this.alert.message = response.message;
        }
      });
  }

  closeAlert(): void {
    this.alert.display = false;
  }

}
