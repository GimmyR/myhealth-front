import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-oversight',
  templateUrl: './edit-oversight.component.html',
  styleUrls: ['./edit-oversight.component.scss']
})
export class EditOversightComponent implements OnInit {

  id!: number;
  
  title!: FormControl;

  date!: FormControl;

  parameters!: any[];

  isConnected!: boolean;

  alert!: any;

  isLoading!: boolean;

  constructor(private http: HttpClient, 
                private router: Router,
                private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isConnected = false;
    this.isLoading = false;
    this.alert = { error: false, display: false, message: null };
    this.http.get(environment.url + "/api/edit-oversight/get/" + this.route.snapshot.params['id'], { withCredentials: true })
      .subscribe((response: any) => {
        if(response.status == 0) {
          this.isConnected = true;
          this.setAttributes(response);
        } else if(response.status == -1)
          this.router.navigateByUrl("sign-in");
        else {
          this.alert.error = true;
          this.alert.display = true;
          this.alert.message = response.message;
        }
      });
  }

  setAttributes(response: any) {
    this.id = response.oversight.id;
    this.title = new FormControl(response.oversight.title);
    this.date = new FormControl(response.oversight.date)
    this.parameters = [];
    response.parameters.forEach((parameter: any) => {
      this.parameters.push(
        { 
          id: parameter.id,
          name: new FormControl(parameter.name),
          unit: new FormControl(parameter.unit)
        }
      );
    });
  }

  addParameter(e: Event) {
    e.preventDefault();
    this.parameters.push(
      { id: 0, name: new FormControl(null), unit: new FormControl(null) }
    );
  }

  removeParameter(e: Event, $i: number) {
    e.preventDefault();
    this.parameters.splice($i, 1);
  }

  submit(e: Event) {
    this.isLoading = true;
    e.preventDefault();

    const params: any[] = [];
    const body = {
      id: this.id,
      title: this.title.value,
      date: this.date.value,
      parameters: params
    };

    this.parameters.forEach((parameter: any) => {
      body.parameters.push(
        { 
          id: parameter.id, 
          name: parameter.name.value, 
          unit: parameter.unit.value 
        }
      );
    }); this.postData(body);

  }

  postData(body: any) {
    this.http.post(environment.url + "/api/edit-oversight/post/", body, { withCredentials: true })
      .subscribe((response: any) => {
        this.isLoading = false;
        if(response.status == -1)
          this.router.navigateByUrl("sign-in");
        else if(response.status == 0) {
          this.alert.display = true;
          this.alert.message = "Mise à jour de surveillance réussie !";
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
