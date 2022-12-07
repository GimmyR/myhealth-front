import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  firstname!: FormControl;
  lastname!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirm!: FormControl;

  alert!: boolean;
  alertMessage!: string;
  isLoading!: boolean;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.firstname = new FormControl(null);
    this.lastname = new FormControl(null);
    this.email = new FormControl(null);
    this.password = new FormControl(null);
    this.confirm = new FormControl(null);

    this.alert = false;
    this.alertMessage = "";
    this.isLoading = false;
  }

  createAccount(e: Event) {
    e.preventDefault();
    if(this.password.value != this.confirm.value) {
      this.alertMessage = "Les 2 mots de passe ne correspondent pas !";
      this.alert = true;
    } else {
      this.isLoading = true;
      let body = {
        firstname: this.firstname.value,
        lastname: this.lastname.value,
        email: this.email.value,
        password: this.password.value
      }; let options = { withCredentials: true };

      this.http.post("http://localhost:8000/api/create-account", body, options)
        .subscribe((response: any) => {
          this.isLoading = false;
          if(response.status == 0)
            this.router.navigateByUrl("");
          else {
            this.alertMessage = response.message;
            this.alert = true;
          }
        });
    }
  }

  closeAlert(): void {
    this.alert = false;
  }

}
