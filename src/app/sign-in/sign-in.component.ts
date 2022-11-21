import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  formData!: FormGroup;

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService) {}
  
  ngOnInit(): void {
    this.formData = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {
    this.http.post("http://localhost:8000/api/sign-in", this.formData.value, { withCredentials: true })
      .subscribe(
        (response: any) => {
          if(response.status == 0) {
            this.router.navigateByUrl("");
          } else console.log(response);
        }
      );

    // POUR FAIRE MARCHER LA SESSION AVEC ANGULAR ET SYMFONY
    // IL FAUT METTRE L'OPTION '{ withCredentials: true }' DANS LA METHODE GET, POST, etc... D'ANGULAR
    // ET IL FAUT AJOUTER LA CONFIG "allow_credentials: true" DANS "nelmio_cors.yaml" DU PROJET SYMFONY
  }
  
}
