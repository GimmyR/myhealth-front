import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  password!: FormControl;
  confirm!: FormControl;
  code!: FormControl;

  alert!: any;
  isLoading!: boolean;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.alert = { display: false, message: null };
    let options = { withCredentials: true };
    this.http.get(environment.url + "/api/forgotten-password/get", options)
      .subscribe((response: any) => {
        if(response.status == -1)
          this.router.navigateByUrl("sign-in");
        else {
          this.password = new FormControl(null);
          this.confirm = new FormControl(null);
          this.code = new FormControl(null);
        }
      });
  }

  save(e: Event) {
    e.preventDefault();
    if(this.password.value != this.confirm.value) {
      this.alert.display = true;
      this.alert.message = "Les 2 mots de passe ne correspondent pas !";
    } else {
      this.isLoading = true;
      let body = {
        password: this.password.value,
        code: this.code.value
      }; let options = { withCredentials: true };
      
      this.http.post(environment.url + "/api/forgotten-password/post", body, options)
        .subscribe((response: any) => {
          this.isLoading = false;
          if(response.status != 0) {
            this.alert.display = true;
            this.alert.message = response.message;
          } else this.router.navigateByUrl("");
        });
    }
  }

  closeAlert(): void {
    this.alert.display = false;
  }

}
