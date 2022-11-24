import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-oversight',
  templateUrl: './create-oversight.component.html',
  styleUrls: ['./create-oversight.component.scss']
})
export class CreateOversightComponent implements OnInit {

  title!: FormControl;

  parameters!: any[];

  constructor(private http: HttpClient, 
                private router: Router) {}

  ngOnInit(): void {
    const options = { withCredentials: true };
    this.http.get("http://localhost:8000/api/create-oversight/get", options)
      .subscribe((response: any) => {
        if(response.status == -1)
          this.router.navigateByUrl("sign-in");
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
    const parameters: any[] = [];
    const body = {
      date: this.getCurrentDateTime(),
      title: this.title.value,
      parameters: parameters
    }; const options = { withCredentials: true };

    this.parameters.forEach(function(parameter: any) {
      body.parameters.push({ name: parameter.name.value, unit: parameter.unit.value });
    });

    this.http.post("http://localhost:8000/api/create-oversight/post", body, options)
      .subscribe((response: any) => {
        if(response.status == -1)
          this.router.navigateByUrl("sign-in")
        else console.log(response);
      });
  }

  addParameter(e: Event) {
    e.preventDefault();
    this.parameters.push(
      { name: new FormControl(''), unit: new FormControl('') }
    );
  }

  removeParameter(e: Event, i: number) {
    e.preventDefault();
    this.parameters.splice(i, 1);
  }

}
