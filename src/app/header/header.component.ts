import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  account!: any;

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService) {}
  
  ngOnInit(): void {}

  disconnect() {
    this.http.get("http://localhost:8000/api/sign-out", { withCredentials: true })
      .subscribe((response: any) => {
        if(response.status == 0) 
          this.router.navigateByUrl("sign-in");
        else console.log(response);
      });
  }

  checkAccount() {
    this.http.get("http://localhost:8000/api/session-check", { withCredentials: true })
      .subscribe((response: any) => {
        if(response.status == 0) {
          this.account = response.account;
        }
      });
  }

}
