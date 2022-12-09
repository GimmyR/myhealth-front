import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-oversight',
  templateUrl: './create-oversight.component.html',
  styleUrls: ['./create-oversight.component.scss']
})
export class CreateOversightComponent implements OnInit {

  title!: FormControl;

  parameters!: any[];

  isConnected!: boolean;

  alert!: any;

  isLoading!: boolean;

  constructor(private http: HttpClient, 
                private router: Router) {}

  ngOnInit(): void {
    this.isConnected = false;
    this.alert = {
      display: false,
      message: null,
      error: false
    }; this.isLoading = false;
    const options = { withCredentials: true };
    this.http.get(environment.url + "/api/session-check", options)
      .subscribe((response: any) => {
        if(response.status == -1)
          this.router.navigateByUrl("sign-in");
        else if(response.status == 0)
          this.isConnected = true;
      });

    this.title = new FormControl(null);
    
    this.parameters = [
      { name: new FormControl(null), unit: new FormControl(null) }
    ];
  }

  getCurrentDateTime() {
    let datetime = new Date();
    let time = datetime.toLocaleTimeString([], 
      { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
    ); return datetime.getFullYear() + "-" + datetime.getMonth() + "-" + datetime.getDate() + " " + time;
  }

  submit(e: Event) {
    e.preventDefault();
    this.isLoading = true;
    const parameters: any[] = [];
    const body = {
      date: this.getCurrentDateTime(),
      title: this.title.value,
      parameters: parameters
    }; const options = { withCredentials: true };

    this.parameters.forEach(function(parameter: any) {
      body.parameters.push({ name: parameter.name.value, unit: parameter.unit.value });
    });

    this.http.post(environment.url + "/api/create-oversight/post", body, options)
      .subscribe((response: any) => {
        this.isLoading = false;
        if(response.status == -1)
          this.router.navigateByUrl("sign-in")
        else if(response.status == 0) {
          this.alert.display = true;
          this.alert.message = "Création de surveillance réussie !"
        } else {
          this.alert.error = true;
          this.alert.display = true;
          this.alert.message = response.message;
        }
      });
  }

  addParameter(e: Event) {
    e.preventDefault();
    this.parameters.push(
      { name: new FormControl(null), unit: new FormControl(null) }
    );
  }

  removeParameter(e: Event, i: number) {
    e.preventDefault();
    this.parameters.splice(i, 1);
  }

  closeAlert(): void {
    this.alert.display = false;
  }

}
