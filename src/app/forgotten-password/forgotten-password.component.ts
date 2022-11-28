import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  password!: FormControl;
  confirm!: FormControl;
  code!: FormControl;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    let options = { withCredentials: true };
    this.http.get("http://localhost:8000/api/forgotten-password/get", options)
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

  save() {
    if(this.password.value != this.confirm.value)
      console.log("Les 2 mots de passe ne correspondent pas !");
    else {
      let body = {
        password: this.password.value,
        code: this.code.value
      }; let options = { withCredentials: true };
      
      this.http.post("http://localhost:8000/api/forgotten-password/post", body, options)
        .subscribe((response: any) => {
          if(response.status != 0)
            console.log(response);
          else this.router.navigateByUrl("");
        });
    }
  }

}
