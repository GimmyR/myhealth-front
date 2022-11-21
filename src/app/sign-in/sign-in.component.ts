import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  formData!: FormGroup;

  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.formData = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {
    this.http.post("http://localhost:8000/api/sign-in", this.formData.value)
      .subscribe(
        (data) => {
          console.log(data);
        }
      );
  }
  
}
