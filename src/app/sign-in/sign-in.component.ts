import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  email!: FormControl;
  password!: FormControl;
  alert!: boolean;
  alertMessage!: string;
  isLoading!: boolean;

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService) {}
  
  ngOnInit(): void {
    this.email = new FormControl(null);
    this.password = new FormControl(null);
    this.alert = false;
    this.alertMessage = "";
    this.isLoading = false;
  }

  submit(e: Event) {
    e.preventDefault();
    this.isLoading = true;
    
    let body = {
      email: this.email.value,
      password: this.password.value
    };
    
    this.http.post("http://localhost:8000/api/sign-in", body, { withCredentials: true })
      .subscribe(
        (response: any) => {
          this.isLoading = false;
          if(response.status == 0)
            this.router.navigateByUrl("");
          else {
            this.alert = true;
            this.alertMessage = response.message;
          }
        }
      );

    // POUR FAIRE MARCHER LA SESSION AVEC ANGULAR ET SYMFONY
    // IL FAUT METTRE L'OPTION '{ withCredentials: true }' DANS LA METHODE GET, POST, etc... D'ANGULAR
    // ET IL FAUT AJOUTER LA CONFIG "allow_credentials: true" DANS "nelmio_cors.yaml" DU PROJET SYMFONY
  }

  forgottenPassword(e: Event) {
    e.preventDefault();
    this.isLoading = true;
    let body = { email: this.email.value };
    let options = { withCredentials: true };
    this.http.post("http://localhost:8000/api/forgotten-password", body, options)
      .subscribe((response: any) => {
        this.isLoading = false;
        if(response.status == 0) {
          this.router.navigateByUrl("forgotten-password");
        } else {
          this.alert = true;
          this.alertMessage = response.message;
        }
      });
  }

  createAccount(e: Event) {
    e.preventDefault();
    this.router.navigateByUrl("create-account");
  }

  closeAlert() {
    this.alert = false;
  }
  
}
